import { createContext, useState } from "react";

export const IdPedidoContext= createContext();

export const IdPedidoProvider= ({children})=>{
    const[pedidoId, setPedidoId]=useState(0)

    const ChangePedido=(valor)=>{
        setPedidoId(valor)
    }

    return(<IdPedidoContext.Provider value={{pedidoId, ChangePedido}}>{children}</IdPedidoContext.Provider>)
        
    
}