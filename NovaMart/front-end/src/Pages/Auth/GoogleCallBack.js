import axios from "axios";
import { useEffect } from "react"
import { BASEURL, GOOGLE_CALL_BACK } from "../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack(){
    const cookie = Cookie()
    const location = useLocation()
    useEffect(() => {
        async function GoogleCall(){
            try{
                const res = await axios.get(`${BASEURL}/${GOOGLE_CALL_BACK}${location.search}`)
                const token = res.data.access_token
                cookie.set('token' , token);
                window.location.pathname = "/";
            }
            catch(err){
                console.log(err);
            }
        }
        GoogleCall();
    } , [location , cookie])

    return;
}