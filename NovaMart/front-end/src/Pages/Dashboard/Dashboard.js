import Dashnav from "../../Components/Dashboard/Dashnav"
import Dashside from "../../Components/Dashboard/Dashside"
import { Outlet } from "react-router-dom"
export default function Dashboard(){
    return(
        <div>
            <Dashnav />
            <div className="flex h-fit">
                <Dashside />
                <div className="flex-1 p-5 overflow-x-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}