import { createContext, useState } from "react";

export const Toggle = createContext();
export default function ToggleDashSide({children}){
    const [isToggle , setIsToggle] = useState(false)

    return(
        <Toggle.Provider value={{isToggle , setIsToggle}}>{children}</Toggle.Provider>
    )
}