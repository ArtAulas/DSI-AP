import { createContext, useState } from "react";

export const EnderecoPedidoContext= createContext();

export const EnderecoPedidoProvider= ({children})=>{
    const[enderecoPedidoId, setEnderecoPedidoId]=useState(0)

    const ChangeEnderecoPedido=(valor)=>{
        setEnderecoPedidoId(valor)
    }
    return(<EnderecoPedidoContext.Provider value={{enderecoPedidoId, ChangeEnderecoPedido}}>{children}</EnderecoPedidoContext.Provider>)
}