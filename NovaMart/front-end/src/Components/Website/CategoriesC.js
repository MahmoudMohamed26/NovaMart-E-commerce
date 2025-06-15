import { useEffect, useState } from "react"
import { CAT } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Skeleton from "react-loading-skeleton";

export default function CategoriesC(){
    const [cats , setCats] = useState([]);
    const [loader , setLoader] = useState(true)
    useEffect(() => {
        try{
            const fetchData = async () => {
                const res = await Axios.get(`${CAT}`)
                setCats(res.data)
                setLoader(false)
            }
            fetchData()
        }catch(e){
            console.log(e);
        }
    } , [])

    const showCats = cats.map((el , index) => {
        return(
            <Link key={index} to={`/shop?category=${el.id}`}>
                <div className={`bg-gray-100 m-auto shadow-md w-[80px] h-[80px] rounded-full bg-cover bg-center`} style={{ backgroundImage: `url(${el.image})` }}></div>
                <p className="mt-2 text-sm text-nowrap text-center">{el.title}</p>
            </Link>
        )
    })

    return(
        <>
            {loader ? 
            <Marquee className="gap-16 container" autoFill>
            <div className="flex justify-center mt-10 gap-16">
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                    <div>
                        <Skeleton borderRadius={100} count={1} width={80} height={80}/>
                        <Skeleton className="mt-3" count={1} width={80} height={10}/>
                    </div>
                </div>
            </Marquee> : <Marquee className="gap-16 container" autoFill pauseOnHover={true} speed={50}>
                <div className=" mt-10 flex gap-16">
                        {showCats}
                </div>
            </Marquee>}
            <div className="mt-8 text-center">
                <Link to={'/categories'} className="px-4 py-1 bg-blue-600 text-white duration-300 border border-blue-600 rounded-sm hover:bg-white hover:text-blue-600">SHOW ALL</Link>
            </div>
        </>
    )
}