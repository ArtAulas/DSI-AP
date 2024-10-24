import { createContext, useState } from "react";

export const IdPedidoConfigContext= createContext();

export const IdPedidoConfigProvider= ({children})=>{
    const[pedidoConfigId, setPedidoConfigId]=useState(0)

    const ChangePedidoConfig=(valor)=>{
        setPedidoConfigId(valor)
    }

    return(<IdPedidoConfigContext.Provider value={{pedidoConfigId, ChangePedidoConfig}}>{children}</IdPedidoConfigContext.Provider>)
        
    
}