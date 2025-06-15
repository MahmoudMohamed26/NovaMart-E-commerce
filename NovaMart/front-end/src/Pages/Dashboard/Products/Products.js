import { useEffect, useState } from "react";
import { pro, PRO } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import noDataImg from "../../../imgs/noData.png";
import Tables from "../../../Components/Tables";

export default function Products() {
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [page , setPage] = useState(1);
  const [from , setFrom] = useState()
  const [total , setTotal] = useState();
  const [tableLoad , setTableLoad] = useState(false)
  const [limit , setLimit] = useState(10);
  const headers = [
    {
      key: "id",
      name: "id",
    },
    {
        key: "images",
        name: "Product Image",
      },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "discount",
      name: "Discount",
    },
    {
      key: "rating",
      name: "Rating",
    },
    {
      key: "stock",
      name: "Stock",
    },
    {
      key: "created_at",
      name: "Created at",
    },
    {
      key: "updated_at",
      name: "Last Updated",
    },
  ];
  async function GetProducts() {
    useEffect(() => {
      setTableLoad(true);
      const fetchData = async () => {
        try {
          const res = await Axios.get(`/${PRO}?limit=${limit}&page=${page}`);
          setLoader(false);
          setProducts(res.data.data);
          setTableLoad(false);
          setTotal(res.data.total);
          setFrom(res.data.from)
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
      // eslint-disable-next-line
    }, [deleteProduct , limit , page]);
  }

  async function handleDelete(id) {
    try {
      await Axios.delete(`/${pro}/${id}`);
      setDeleteProduct((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }
  GetProducts();
  return loader ? (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <ClipLoader color="#526de3" size={70} />
    </div>
  ) : products.length === 0 ? (
    <div>
      <div className="flex justify-end">
        <Link
          to={"add"}
          className="h-fit py-2 mb-5 flex items-center gap-2 duration-300 hover:bg-blue-700 w-fit px-3 text-white bg-blue-500 font-bold rounded-md"
        >
          <span>
            <MdOutlineShoppingCart />
          </span>{" "}
          Add Product
        </Link>
      </div>
      <div className="h-[calc(100vh-180px)] select-none flex flex-col justify-center items-center">
        <img src={noDataImg} width="400px" alt="noData" />
        <p className="text-xl">No Products found</p>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex justify-end">
        <Link
          to={"add"}
          className="h-fit py-2 mb-5 flex items-center gap-2 duration-300 hover:bg-blue-700 w-fit px-3 text-white bg-blue-500 font-bold rounded-md"
        >
          <span>
            <MdOutlineShoppingCart />
          </span>{" "}
          Add Product
        </Link>
      </div>
        <Tables 
        headers={headers} 
        data={products} 
        delete={handleDelete}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
        tableLoad={tableLoad}
        from={from}
        placeholder="Search Product ..."
        link={pro}
        searchtype="title"
        />
    </div>
  );
}
