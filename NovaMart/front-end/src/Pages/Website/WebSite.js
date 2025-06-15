import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Website/NavBar";
import CategoriesC from "../../Components/Website/CategoriesC";

export default function Website(){
    return(
        <>
            <NavBar />
            <Outlet />
        </>
    )
}