import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL , USER } from "../../Api/Api";
import { ClipLoader } from "react-spinners";

export default function RequireAuth({allowedRole}){
    const cookie = Cookie()
    const token = cookie.get('token')
    const nav = useNavigate()
    const [user , setUser] = useState("")
    useEffect(() => {

            axios.get(`${BASEURL}/${USER}` , {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).then((data) => setUser(data.data))
        .catch(() => nav('/login' , {replace: true}))
            
    // eslint-disable-next-line
    } , [token])

    return(
        token ? (
            user === "" ?
            <div className="h-[calc(100vh-120px)] flex items-center justify-center">
                <ClipLoader color="#526de3" size={70} />
            </div>
            : (allowedRole.includes(user.role)) ?
            <Outlet /> : (user.role === "2001" ? <Navigate to={'/'} replace={true} /> : <Navigate to={'/dashboard'} replace={true}/>)
        ) : <Navigate to={'/login'} replace={true} />
    );
}