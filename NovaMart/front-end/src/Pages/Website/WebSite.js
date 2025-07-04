import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Website/NavBar";
import Footer from "../../Components/Website/Footer";

export default function Website() {
    return (
        <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow">
            <Outlet />
        </div>
        <Footer />
        </div>
    );
}