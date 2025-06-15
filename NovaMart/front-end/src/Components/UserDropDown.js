import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { BASEURL , USER , LOGOUT } from '../Api/Api';
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

export default function UserDropDown(){

    const nav = useNavigate()
    const [user , setUser] = useState("")
    const cookie = Cookie()
    const [loader , setLoader] = useState(true)
    const token = cookie.get('token')
    useEffect(() => {

        const fetchData = async() => {
            await axios.get(`${BASEURL}/${USER}` , {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }).then((data) => setUser(data.data))
            .catch(() => nav('/login' , {replace: true}))
            setLoader(false)
        }
        fetchData();
    // eslint-disable-next-line
    } , [token])

    async function handleLogout(){
        try{
            await axios.get(`${BASEURL}/${LOGOUT}` , {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
        }
        catch(err){
            console.log(err);
        }
        window.location.pathname = '/login';
        cookie.set("token" , "");
    }

    return(
        <Menu as="div" className="relative inline-block text-left">
      <div className='group'>
        <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-400 shadow-sm ring-1 duration-300 ring-inset group hover:bg-blue-600 hover:text-white">
          {loader ? <BeatLoader color="#526de3" size={7} /> : `Hi, ${user.name}`}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 duration-300 text-gray-400 group-hover:text-white" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
            <MenuItem>
            <Link
              to={'/'}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Account
            </Link>
          </MenuItem>
          {(user.role === '1995' || user.role === '1999') && <MenuItem>
            <Link
              to={'/dashboard'}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Dashboard
            </Link>
          </MenuItem>}
          <MenuItem>
            <Link
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Sign out
            </Link>
          </MenuItem>
          
        </div>
      </MenuItems>
    </Menu>
    )
}