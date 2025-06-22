import { useState } from "react";
import axios from "axios";
import { BASEURL , REGISTER } from "../../Api/Api";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookie from "cookie-universal";
export default function Register(){
    const [form , setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [loader , setLoader] = useState(false);
    const [show , setShow] = useState(true);
    const [error , setError] = useState(false);
    const [emailError , setEmailError] = useState("");

    const cookie = Cookie();
    function handleChange(e){
        setForm({...form , [e.target.name]: e.target.value})
    }

    async function handleRegister(e){
        setError(false);
        setLoader(true);
        e.preventDefault()
        try{
            const res = await axios.post(`${BASEURL}/${REGISTER}` , form);
            setLoader(false)
            window.location.pathname = '/';
            const token = res.data.token;
            cookie.set('token' , token);
        }
        catch(err){
            if(err.response.status === 422){
                setError(true)
                setEmailError("This email is already in used");
            }
            else {
                setError(true);
                setEmailError(err.message);
            }
            setLoader(false)
            console.log(err);
        }
    }

    return(
        <div className="max-w-[500px] m-auto h-[100vh] flex flex-col justify-center">
            <h1 className="container text-center text-4xl mb-10">Welcome to Nova<span className="text-blue-600 font-bold">Mart</span></h1>
            <h2 className="container uppercase text-blue-500 text-center text-2xl font-bold">register</h2>
            <form className="container !mt-10" onSubmit={handleRegister}>
                <div className="mb-6">
                    <label className="font-bold text-blue-500">Username</label>
                    <input placeholder="Username" type="text" id="name" name="name" required value={form.name} onChange={handleChange} className="border border-blue-300 outline-none rounded-sm w-full py-1 px-3 text-blue-500" />
                </div>
                <div className="mb-6">
                    <label className="font-bold text-blue-500">E-mail</label>
                    <input placeholder="example@gmail.com" type="email" id="email" name="email" required value={form.email} onChange={handleChange} className="border border-blue-300 outline-none rounded-sm w-full py-1 px-3 text-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="font-bold text-blue-500">Password</label>
                    <div className="relative">
                        <input placeholder="Password" type={show ? "password" : "text"} id="password" name="password" required value={form.password} onChange={handleChange}  className="border border-blue-300 outline-none rounded-sm w-full py-1 px-3 text-blue-500 bg-blue-10" />
                        {!show ? <FaEye onClick={() => setShow((prev) => !prev)} className="absolute right-3 top-1/2 translate-y-1/2 cursor-pointer" size={23} color="#526de3" />
                        : <FaEyeSlash onClick={() => setShow((prev) => !prev)} className="absolute right-3 top-1/2 translate-y-1/2 cursor-pointer" size={23} color="#526de3"/>}
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-sm">Already member ? <Link className="text-blue-500 duration-300 hover:text-blue-700" to="/login">Login</Link></p>
                </div>
                <div className="mt-4">
                    <button type="submit" className="h-fit py-2 duration-300 hover:bg-blue-700 w-full px-3 text-white bg-blue-500 font-bold rounded-md">{loader ? <BeatLoader size={10} color="#FFFFFF"/> : "Register"}</button>
                </div>
                {error && <p className="mt-4 text-red-700 text-sm font-semibold">{emailError}</p>}
            </form>
        </div>
    )
}