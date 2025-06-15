import { createContext, useState } from "react";
import { useEffect } from "react";

export const Window = createContext()

export default function WindowContext({children}){
    const [windowSize , setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        function setWindowWith(){
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize' , setWindowWith)

        return () => {
            window.removeEventListener('resize' , setWindowWith)
        }
    } , [])

    return(
        <Window.Provider value={{windowSize , setWindowSize}}>{children}</Window.Provider>
    )
}