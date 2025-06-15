import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { pro } from "../../Api/Api";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import TopRated from "../../Components/Website/TopRated";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Recommended from "../../Components/Website/Recommended";
import { CartCon } from "../../Context/CartContext";
import { ToastContainer, toast , Bounce } from 'react-toastify';

export default function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loader , setLoader] = useState(false);
    const [productImages, setProductImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [count , setCount] = useState(1);
    const {setChange} = useContext(CartCon)

    useEffect(() => {
        setCount(1)
        setCurrentIndex(0)
        setLoader(false)
        const fetchData = async () => {
            await Axios.get(`${pro}/${id}`)
                .then((res) => {
                    setProduct(res.data);
                    setProductImages(res.data[0].images.map((el) => el.image));
                })
                .catch((error) => console.error("Error fetching data:", error));
                setLoader(true);
        };
        fetchData();
    }, [id]);

    function Addtocart(id , stock , count){
        const prevItems = JSON.parse(localStorage.getItem('product')) || [];
        const isExist = prevItems.find((pro) => pro.id === id);
        if(isExist && isExist.count + count > stock){
            toast.error('Not enough in stock', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                console.log("test");
        }
        else{
            if(count > stock){
                toast.error('Not enough in stock', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                    
            }
            else {
                setChange((prev) => !prev)
                toast.success('Added successfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                if(isExist){
                    if(isExist.count){
                        isExist.count = isExist.count + count
                    }
                    else{
                        isExist.count = count + 1;
                    }
                }else{
                    if(count > 1){
                        prevItems.push(...product)
                        const theProduct = prevItems.find((pro) => pro.id === id);
                        theProduct.count = count;
                    }else {
                        prevItems.push(...product)
                    }
                }
                localStorage.setItem('product' , JSON.stringify(prevItems))
            }
        }
    }

    const showData = product.map(function(el , index){
        const roundStar = Math.round(el.rating)
        const star = Math.min(roundStar , 5)
        const coloredStars = Array.from({ length: star}).map((el , index) => <FaStar key={index} color="#526de3" size={25}/>)
        const empytyStars = Array.from({ length: 5 - star}).map((el , index) => <CiStar key={index} color="#526de3" size={25}/>)
        return(
            <div key={index} className="mt-14 w-full">
                    {el.stock > 0 ? <span className="text-green-600 text-[0.6rem] font-bold">ON STOCK{el.stock < 5 ? <span className="text-gray-400">  ({el.stock} in stock)</span> : ""}</span> : <span className="text-red-700 text-[0.6rem] font-bold">OUT OF STOCK</span>}
                    <h1 className="font-bold text-4xl">{el.title}</h1>
                    <p className="text-gray-400 mt-4">{el.description}</p>
                    <div className="flex mt-5 items-center">
                        <span className="text-xl font-semibold text-blue-600 mr-2">{el.rating}</span>
                        {coloredStars}
                        {empytyStars}
                    </div>
                    <div className="mt-10 flex gap-14 justify-between flex-col-reverse md:flex-row md:items-end">
                        <div className="flex gap-4">
                            <button onClick={() => Addtocart(el.id , el.stock , count)} className="py-2 px-6 duration-300 text-blue-600 bg-white hover:bg-blue-600 hover:text-white border border-blue-600 rounded-sm font-semibold outline-none flex gap-3 items-center"><span><MdOutlineShoppingCart size={20} /></span><span>Add to cart</span></button>
                            <div className="border rounded-sm flex items-center">
                                <span onClick={() => setCount(prev => prev+1)} className="font-bold h-full px-2 flex items-center select-none text-2xl cursor-pointer hover:bg-gray-100"><GoPlus size={20} /></span>
                                <span className="block font-semi text-xl px-6">{count}</span>
                                <span onClick={() => {
                                    if(count!== 1){
                                        setCount(prev => prev-1)
                                    }
                                }} className="select-none font-bold text-2xl flex items-center px-2 h-full cursor-pointer hover:bg-gray-100"><FiMinus size={20} /></span>
                            </div>
                        </div>
                        <div className="flex gap-2 items-end">
                            <p className="text-blue-600 font-bold text-5xl">{el.discount !== 0 ? `$${el.price*(1-(el.discount/100))}` : `$${el.price}`}</p>
                            {el.discount > 0 && <del className="text-red-600 text-2xl"><span>${el.price}</span></del>}
                        </div>
                    </div>
                </div>
        )
    })
    return (
        <>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
        <div className="flex gap-2">
            <div className=" py-10 flex-1 mt-28 gap-10 container flex flex-col lg:flex-row">
                {!loader ? <div className="flex flex-1 flex-col lg:flex-row gap-10">
                    <div>
                        <div><Skeleton count={1} width={400} height={400}/></div>
                        <div className="flex gap-1">
                            <Skeleton count={1} width={97} height={100}/>
                            <Skeleton count={1} width={97} height={100}/>
                            <Skeleton count={1} width={97} height={100}/>
                            <Skeleton count={1} width={97} height={100}/>
                        </div>
                    </div>
                    <div className="flex-1 mt-10">
                            <Skeleton count={1} width={50} height={10}/>
                            <Skeleton count={1} width="100%" height={10}/>
                            <Skeleton count={1} width="90%" height={10}/>
                            <Skeleton count={1} width="60%" height={10}/>
                            <Skeleton count={1} width="100%" height={10}/>
                            <Skeleton count={1} width="70%" height={10}/>
                            <Skeleton count={1} width={200} height={20}/>
                        <div className="mt-[100px] flex justify-between">
                            <div className="flex gap-5">
                                <Skeleton count={1} width={200} height={30}/>
                                <Skeleton count={1} width={200} height={30}/>
                            </div>
                        </div>
                    </div>
                </div> 
                :<>
                    <div className="flex flex-col items-center">
                    <div className={`w-[400px] h-[400px] bg-cover bg-center`} style={{ backgroundImage: `url(${productImages[currentIndex]})` }}></div>
                    
                    <div className="mt-5">
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={4}
                            spaceBetween={5}
                            style={{ width: "300px" }}
                        >
                            {productImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="h-[100px] bg-cover bg-center cursor-pointer"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        border: currentIndex === index ? "2px solid #007bff" : "2px solid #ccc",
                                        borderRadius: "5px",
                                    }}
                                    onClick={() => setCurrentIndex(index)}
                                    ></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                {showData}
                </> }
            </div>
        </div>
        <div className="mt-[100px]">
            <TopRated />
            <Recommended id={product[0]?.category} not={product[0]?.id}/>
        </div>
        </>
    );
}
