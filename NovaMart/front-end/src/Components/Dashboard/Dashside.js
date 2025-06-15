import { useContext, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Menu } from "../../Context/MenuContext";
import { BiCategory } from "react-icons/bi";
import { Toggle } from "../../Context/ToggleDashSide";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect } from "react";
import { BASEURL, USER } from "../../Api/Api";
import Skeleton from "react-loading-skeleton";
export default function Dashside() {
    const menu = useContext(Menu);
    const toggle = useContext(Toggle);
    const [loader , setLoader] = useState(true);
    const [user , setUser] = useState("")
    const cookie = Cookie()
    const token = cookie.get('token')
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${BASEURL}/${USER}` , {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).then((data) => setUser(data.data))
            setLoader(false)
        }
        fetchData()
// eslint-disable-next-line
} , [token])
    return (
        <>
            {toggle.isToggle && (
                <div className={`shadow-md z-20 ${window.innerWidth <= 768 ? "fixed" : "sticky"} bg-white max-w-[282px] h-[calc(100vh-80px)] px-4 py-6 top-[80px] duration-300`}>
                    {loader ? <div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                        <div className="mb-2"><Skeleton count={1} width={250} height={40}/></div>
                    </div> : <ul className="select-none">
                        {user === "" ? <li className="w-[210.67px]"></li> : <>
                            {user.role === "1995" && <li className="w-fit">
                                <NavLink
                                    to="/dashboard/users"
                                    className={({ isActive }) =>
                                        `${isActive ? "bg-blue-100" : ""} mb-2 min-h-[52px] rounded-md ${menu.isOpen ? "w-[250px]" : "w-[56px]"} overflow-hidden cursor-pointer px-4 relative before:absolute before:left-[-52px] before:top-[-20px] before:duration-300 before:opacity-60 hover:before:left-[calc(100%+54px)] before:bg-white before:z-10 before:h-[100px] before:rotate-45 before:w-5 hover:bg-blue-100 duration-300 text-blue-600 text-2xl flex items-center gap-5`
                                    }
                                >
                                    <div className="flex-shrink-0"><FaUsers /></div> {menu.isOpen && <p className="text-xl pr-20">Users</p>}
                                </NavLink>
                            </li>}
                            {(user.role === "1999" || user.role === "1995") && <>
                                <li className="w-fit">
                                <NavLink
                                    to="/dashboard/categories"
                                    className={({ isActive }) =>
                                        `${isActive ? "bg-blue-100" : ""} mb-2 min-h-[52px] ${menu.isOpen ? "w-[250px]" : "w-[56px]"} rounded-md overflow-hidden cursor-pointer px-4 relative before:absolute before:left-[-52px] before:top-[-20px] before:duration-300 before:opacity-60 hover:before:left-[calc(100%+54px)] before:bg-white before:z-10 before:h-[100px] before:rotate-45 before:w-5 hover:bg-blue-100 duration-300 text-blue-600 text-2xl flex items-center gap-5`
                                    }
                                >
                                    <div className="flex-shrink-0"><BiCategory /></div> {menu.isOpen && <p className="text-xl pr-20">Categories</p>}
                                </NavLink>
                                </li>
                                <li className="w-fit">
                                <NavLink
                                    to="/dashboard/products"
                                    className={({ isActive }) =>
                                        `${isActive ? "bg-blue-100" : ""} mb-2 min-h-[52px] ${menu.isOpen ? "w-[250px]" : "w-[56px]"} rounded-md overflow-hidden cursor-pointer px-4 relative before:absolute before:left-[-52px] before:top-[-20px] before:duration-300 before:opacity-60 hover:before:left-[calc(100%+54px)] before:bg-white before:z-10 before:h-[100px] before:rotate-45 before:w-5 hover:bg-blue-100 duration-300 text-blue-600 text-2xl flex items-center gap-5`
                                    }
                                >
                                    <div className="flex-shrink-0"><MdOutlineShoppingCart /> </div>{menu.isOpen && <p className="text-xl pr-20">Products</p>}
                                </NavLink>
                            </li>
                            </>}
                        </>}
                    </ul>}
                </div>
            )}
        </>
    );
}
