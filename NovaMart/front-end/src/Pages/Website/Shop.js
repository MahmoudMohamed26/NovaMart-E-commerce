import { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from "@mui/material";
import { Axios } from "../../Api/Axios";
import { CAT, pro , PRO } from "../../Api/Api";
import Product from "../../Components/Website/Product";
import PaginatedItems from "../../Components/Dashboard/Paginate/Paginate";
import { Bounce, ToastContainer } from "react-toastify";
import noResults from "../../imgs/noResults.png";
import Slider from "../../Components/Website/Slider";
import Skeleton from "react-loading-skeleton";
import { StringParam , useQueryParam, NumberParam } from "use-query-params";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(4000);
    const [cats, setCats] = useState([]);
    const [selectedCat] = useQueryParam("category", NumberParam)
    const [page, setPage] = useState(1);
    const [proload , setProload] = useState(true);
    const [cproload , setCProload] = useState(true);
    const [total, setTotal] = useState(0);
    const [selectedCats, setSelectedCats] = useState([]);
    const [stock , setStock] = useState([]);
    const [searchQuery] = useQueryParam("search" , StringParam);
    let limit = 10;

    useEffect(() => {

        const getcats = async () => {
            try {
                const res = await Axios.get(`${CAT}`);
                setCats(res.data);
                const allCategoryIds = res.data.map((cat) => cat.id);
                selectedCat ? setSelectedCats([selectedCat]) : setSelectedCats(allCategoryIds);
            } catch (err) {
                console.log(err);
            } finally {
                setCProload(false);
            }
        };
        getcats();
    }, [selectedCat]);

    useEffect(() => {
        if(cproload) return;
        const fetchData = async () => {
            try {
                const stockQuery = stock.length === 0 || stock.length === 2
                ? ""
                : `&stock=${stock.join("")}`;
                const url = searchQuery?.length ? `${pro}/search?title=${searchQuery}&` : `${PRO}?`;
                const res = await Axios.get(`${url}limit=${limit}&page=${page}&max_price=${max}&min_price=${min}${stockQuery}&categories=${selectedCats.join(",")}`);
                setProducts(res.data.data);
                setTotal(res.data.total);
            } catch (err) {
                console.log(err);
            } finally {
                setProload(false);
            }
        };
        fetchData();
    }, [page, searchQuery , limit, selectedCats , max , min , stock, cproload]);

    const handleCategoryChange = (event, catId) => {
        if (event.target.checked) {
        setSelectedCats((prev) => [...prev, catId]);
        } else {
        setSelectedCats((prev) => prev.filter(id => id !== catId));
        }
    };

    const handleStockChange = (event, value) => {
        if (event.target.checked) {
        setStock((prev) => [...prev, value]);
        } else {
        setStock((prev) => prev.filter((item) => item !== value));
        }
    };

    const showPros = products.length > 0 && products.map((el, index) => (
        <Product
        key={index}
        id={el.id}
        rating={el.rating}
        title={el.title}
        desc={el.description}
        price={el.price}
        stock={el.stock}
        discount={el.discount}
        image1={el.images[0].image}
        image2={el.images[1]?.image}
        />
    ));

    const showCats = cats.map((el, index) => (
        <FormControlLabel
        key={index}
        control={<Checkbox checked={selectedCats.includes(el.id)} onChange={(e) => handleCategoryChange(e, el.id)} />}
        label={el.title}
        />
    ));

    return (
        <>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
        <div className="container min-h-[126px] relative bg-[url('http://ps.magentech.com/themes/sp_bestshop/themes/sp_bestshop/assets/img/icon/breadcumb.jpg')] bg-cover bg-center bg-no-repeat rounded-md">
            <h1 className="absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2 text-blue-600 font-semibold text-3xl">
            S H O P
            </h1>
        </div>
        {proload ? (
            <div className="container mt-10 flex gap-10">
            <div className="hidden md:block"><Skeleton count={1} height={1035} width={400} /></div>
            <div className="flex-1">
                <div className="special-grid2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i}>
                    <Skeleton count={1} height={300} />
                    <Skeleton className="mt-3" count={1} width={60} />
                    <Skeleton className="mt-3" count={1} width={200} />
                    <Skeleton className="mt-3" count={1} width={250} />
                    <div className="mt-10 flex justify-between">
                        <Skeleton count={1} width={60} />
                        <Skeleton count={1} width={130} />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <Skeleton count={1} height={30} width={250} />
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>)
            :  (
            <div className="container flex flex-col sm:flex-row gap-10 mt-10">
                <div className="sm:w-[400px] w-full !pr-12 p-4 rounded-md">
                    <div>
                    <h2 className="text-4xl font-bold mb-5 text-blue-600 border-b pb-5">FILTERS</h2>
                    </div>
                    <div>
                    <h3 className="text-2xl font-semibold mb-2">Price Control</h3>
                    <Slider min={min} max={max} setMax={setMax} setMin={setMin} />
                    </div>
                    <div className="mt-20 py-10 border-t">
                    <h3 className="text-2xl font-semibold pb mb-2">Availability</h3>
                    <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={stock.includes("more_than_0")}
                                onChange={(e) => handleStockChange(e, "more_than_0")}
                            />
                            }
                            label="In stock"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={stock.includes("zero")}
                                onChange={(e) => handleStockChange(e, "zero")}
                            />
                            }
                            label="Out of stock"
                        />
                    </FormGroup>
                    </div>
                    <div className="py-10 border-t">
                    <h3 className="text-2xl font-semibold pb mb-2">Categories</h3>
                    <FormGroup>{showCats}</FormGroup>
                    </div>
                </div>
                <div className="flex-1">
                    {products.length === 0 ? <div className="sticky top-0 flex flex-col items-center">
                        <img src={noResults} width={300} alt="noResults"/>
                        <p className="font-bold text-3xl text-[#7B7C7D]">No Products Found</p>
                        <p className="mt-4 text-[#7B7C7D]">Your search did not match any products</p>
                    </div> : <>
                        <div className="special-grid2">{showPros}</div>
                        <div className="mt-10">
                            <PaginatedItems total={total} setPage={setPage} limit={limit} />
                        </div>
                    </>}
                </div>
            </div>
        )}
    </>
    );
}
