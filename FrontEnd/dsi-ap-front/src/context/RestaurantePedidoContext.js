import { createContext, useState } from "react";

export const IdRestPedidoContext= createContext();

export const IdRestPedidoProvider= ({children})=>{
    const[restIdpedido, setRestIdPedido]=useState(0)

    const ChangeRestPedido=(valor)=>{
        setRestIdPedido(valor)
    }

    return(<IdRestPedidoContext.Provider value={{restIdpedido, ChangeRestPedido}}>{children}</IdRestPedidoContext.Provider>)
}