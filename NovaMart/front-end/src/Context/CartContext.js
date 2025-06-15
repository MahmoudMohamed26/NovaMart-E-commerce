import { createContext, useState } from "react";

export const CartCon = createContext();
export default function CartContext({children}){
    const [change , setChange] = useState(true)

    return(
        <CartCon.Provider value={{ change, setChange }}>{children}</CartCon.Provider>
    )
}