import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect } from "react";
import { Window } from "../../Context/WindowContext";
import { Toggle } from "../../Context/ToggleDashSide";
import Hamburger from 'hamburger-react';

import UserDropDown from "../UserDropDown";
import { Link } from "react-router-dom";

export default function Dashnav() {
    const menu = useContext(Menu);
    const window = useContext(Window);
    const toggle = useContext(Toggle);

    useEffect(() => {
        if (window.windowSize > 768) {
            toggle.setIsToggle(true);
        } else {
            toggle.setIsToggle(false);
            menu.setIsOpen(true);
        }
    //eslint-disable-next-line
    }, [window.windowSize]);

    function toggleSide(){
        if(window.windowSize > 768){
            menu.setIsOpen(!menu.isOpen);
        } else {
            toggle.setIsToggle(!toggle.isToggle);
        }
    }

    return (
        <div className="bg-white sticky top-0 py-4 shadow-md z-30">
            <div className="container flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Link to={'/'} className="font-thin text-3xl select-none">Nova<span className="text-blue-600 font-bold">Mart</span></Link>
                    <Hamburger
                        color="#808080"
                        size={25}
                        toggled={window.windowSize > 768 ? menu.isOpen : toggle.isToggle}
                        toggle={window.windowSize > 768 ? menu.setIsOpen : toggle.setIsToggle}
                        className="text-4xl cursor-pointer"
                        onClick={toggleSide}
/>
                </div>
                <div>
                    <UserDropDown />
                </div>
            </div>
        </div>
    );
}
