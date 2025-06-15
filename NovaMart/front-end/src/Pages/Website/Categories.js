import { useEffect, useState } from "react"
import { Axios } from "../../Api/Axios";
import { CAT } from "../../Api/Api";
import WordOperation from "../../helpers/WordOperation";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function Categories(){

    // eslint-disable-next-line
    const [cats , setCats] = useState([]);
    const [loader , setLoader] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            await Axios.get(`${CAT}`)
            .then(res => setCats(res.data))
            setLoader(false)
        }
        fetchData()
    } , [])

    const showCats = cats.map((element , index) => (
        <Link key={index} to={`/shop?category=${element.id}`} className="duration-300 relative before:bg-gray-200 before:w-[200px] before:h-[300px] before:rotate-[30deg] before:absolute group before:right-[-100px] overflow-hidden before:duration-300 hover:before:right-[-40px] hover:before:bg-blue-600 z-0 bg-gray-100 rounded-md px-5 flex items-center justify-between">
                <div className="flex-1">
                    <p className="break-words text-lg mb-5">{WordOperation(element.title)}</p>
                    <p className="break-words text-xs text-blue-600">SEE PRODUCTS &gt;</p>
                </div>
                <div className={`w-[150px] h-[150px] duration-300 group-hover:scale-110 rounded-sm bg-center bg-cover bg-no-repeat relative z-10`} style={{ backgroundImage: `url(${element.image})`}}></div>
            </Link>
    ))


    return(
        loader ? <div className="special-grid container mt-10">
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
            <div><Skeleton count={1} height={150}/></div>
        </div>
        : <div className="container special-grid mt-10">
                {showCats}
        </div>
    )
}