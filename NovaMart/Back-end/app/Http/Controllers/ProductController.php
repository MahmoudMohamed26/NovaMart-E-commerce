<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{

    public function search(Request $request)
    {
        try {
            // Start building the query
            $query = Product::with('Images')->where('title' , '!=' , 'dummy');
            
            if($request->has('title') && !is_null($request->input('title'))) {
                $query->where('title', 'like', "%" . $request->input('title', '') . "%");
            }

            // Apply price filter if provided
            if ($request->has('min_price') && $request->has('max_price')) {
                $query->whereBetween('price', [$request->input('min_price'), $request->input('max_price')]);
            }

            // Apply category filter if provided
            if ($request->has('categories')) {
                $categories = explode(',', $request->input('categories')); // Convert comma-separated string to array
                $query->whereIn('category', $categories);
            }

            // Apply stock filter if provided
            if ($request->has('stock')) {
                $stock = $request->input('stock');
                if ($stock == 'zero') {
                    $query->where('stock', 0); // Only products with stock 0
                } elseif ($stock == 'more_than_0') {
                    $query->where('stock', '>', 0); // Only products with stock greater than 0
                }
            }

            // Apply pagination or return all products
            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);

            $products = $query->paginate($limit, ['*'], 'page', $page);

            return response()->json($products);

        } catch (\Exception $e) {
            // Catch and log the error
            \Log::error('Error fetching products: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }


    public function getLastSaleProducts(Request $request)
    {
        $products = Product::with('Images')->where('status', '=', 'published')->where('discount', '>', '0')->latest()->take(5)->get();
        return $products;
    }


    public function getLatest(Request $request)
    {
        $products = Product::with('Images')->where('status', '=', 'published')->latest()->take(5)->get();
        return $products;
    }

    public function getTopRated(Request $request)
    {
        $products = Product::with('Images')
            ->where('status', '=', 'published')
            ->where('rating', '>=', '3.4')
            ->orderBy('rating', 'desc') // Sort by rating in descending order
            ->take(5) // Limit to top 5 results
            ->get();

        return $products;
    }

    public function getRecommendedProducts(Request $request, $categoryId)
    {
        $categoryId = (int)$categoryId;
        $products = Product::with('Images')
            ->where('status', '=', 'published')
            ->where('category', '=', $categoryId)
            ->latest()
            ->take(5)
            ->get();
            
        return $products;
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new Product();
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required | numeric',
            'discount' => 'required | numeric',
            'About' => 'required'
        ]);
        $productCreated = $product->create([
            'category' => $request->category,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'About' => $request->About,
            'discount' => $request->discount,
        ]);
        return $productCreated;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Product::where('id', $id)->with('Images')->where('status', '=', 'published')->get();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $request->validate([
            'category' => 'required',
            'title' => 'required',
            'description' => 'required',
            'price' => 'required | numeric',
            'discount' => 'required | numeric',
            'About' => 'required',
            'stock' => 'required | numeric'
        ]);
        $product->update([
            'category' => $request->category,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'About' => $request->About,
            'discount' => $request->discount,
            'stock' => $request->stock

        ]);
        $product->status = 'published';
        $product->save();
        $productId = $product->id;
        if ($request->hasFile('images')) {
            $files = $request->file("images");
            $i = 0;
            foreach ($files as $file) {
                $i = $i + 1;
                $image = new ProductImage();
                $image->product_id = $productId;
                $filename = date('YmdHis') . $i . '.' . $file->getClientOriginalExtension();
                $path = 'images';
                $file->move($path, $filename);
                $image->image = url('/') . '/images/' . $filename;
                $image->save();
            }
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $productImages = ProductImage::where('product_id', '=', $id)->get();
        foreach ($productImages as $productImage) {
            $path = public_path() . '/images/' . substr($productImage['image'], strrpos($productImage['image'], '/') + 1);
            if (File::exists($path)) {
                File::delete($path);
            }
        }
        DB::table('products')->where('id', '=', $id)->delete();
    }
}
