import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import WordOperation from "../../helpers/WordOperation";
import { FaStar } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import { useContext } from "react";
import { CartCon } from "../../Context/CartContext";
import { pro } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

export default function Product(props){
    const roundStar = Math.round(props.rating)
    const star = Math.min(roundStar , 5)
    const coloredStars = Array.from({ length: star}).map((el , index) => <FaStar key={index} color="#526de3" size={15}/>)
    const empytyStars = Array.from({ length: 5 - star}).map((el , index) => <CiStar key={index} color="#526de3" size={15}/>)
    const {setChange} = useContext(CartCon)
    function Addtocart(id, stock, count) {
        const fetchData = async () => {
            try {
                const res = await Axios.get(`${pro}/${id}`);
                const product = res.data;
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
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
    
        fetchData();
    }

    return(
        <>
            <div className="relative flex flex-col justify-between border group rounded-md p-1">
                <div>
                    <div className="relative overflow-hidden">
                        <Link title={props.title} to={`/product/${props.id}`}><div className={`w-full h-[300px] group-hover:scale-105 bg-cover bg-transparent bg-center bg-no-repeat ${props.image2 ? "group-hover:opacity-0":  ""} relative z-10 duration-500`} style={{ backgroundImage: `url(${props.image1})` }}></div></Link>
                        {props.image2 && <Link to={`/product/${props.id}`}><div className={`w-[calc(100%-0.5rem)] group-hover:scale-105 h-[300px] bg-cover bg-center duration-500 bg-no-repeat bg-transparent opacity-0 group-hover:opacity-100 absolute top-1 left-1`} style={{ backgroundImage: `url(${props.image2})` }}></div></Link>}
                    </div>
                    <div className="mx-3">
                        {props.stock > 0 ? <p className="text-sm font-semibold my-2 pb-3 border-b text-green-600">In Stock</p> : <p className="text-sm font-semibold my-2 pb-3 border-b text-red-700">Out of stock</p> }
                    </div>
                    <div className="border-b mx-3 flex flex-col justify-between min-h-[100px] pb-2">
                        <div>
                            <h1 className="font-semibold">{WordOperation(props.title , 20)}</h1>
                            <p className="text-gray-400 text-sm">{WordOperation(props.desc , 80)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex mx-3 justify-between items-center mt-4">
                    <div>
                        <span className="font-semibold text-lg text-blue-600">${props.price * (1-(props.discount/100))}</span>
                        {props.discount > 0 && <del className="text-red-600 text-xs"><span className="ml-1 text-xs">${props.price}</span></del>}
                    </div>
                    <div className="flex items-center">
                        <span className="text-xs font-semibold text-blue-600 mr-2">{props.rating}</span>
                        {coloredStars}
                        {empytyStars}
                    </div>
                </div>
                {props.discount > 0 && <span className="absolute right-4 top-4 text-white bg-red-700 text-[0.6rem] font-semibold px-1 py-1 rounded-sm z-20">SALE %{props.discount}</span>}
                <div className="mx-3">
                    <button onClick={() => Addtocart(props.id , props.stock , 1)} className="my-4 w-full py-1 bg-white text-blue-600 duration-300 hover:bg-blue-600 hover:text-white border rounded-full border-blue-600"> Add to cart</button>
                </div>
            </div>
        </>
    )
}