import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

export default function LoginRegisterAuth(){

    const cookie = Cookie();
    const token = cookie.get("token");


    return(
        token ? <Navigate to={"/"}/> : <Outlet />
    )
}