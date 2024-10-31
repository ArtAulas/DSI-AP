import { createContext, useState } from "react";

export const PedidoPaginaContext= createContext();

export const IdPedidoPageProvider= ({children})=>{
    const[pedidoIdpage, setPedidoIdPage]=useState(0)

    const ChangePedidoPage=(valor)=>{
        setPedidoIdPage(valor)
    }

    return(<PedidoPaginaContext.Provider value={{pedidoIdpage, ChangePedidoPage}}>{children}</PedidoPaginaContext.Provider>)
        
    
}