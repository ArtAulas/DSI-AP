import { createContext, useState } from "react";

export const CodigoContext= createContext();

export const CodigoProvider= ({children})=>{
    const[codigo, setCodigo]=useState(0)

    const ChangeCodigo=(valor)=>{
        setCodigo(valor)
    }

    return(<CodigoContext.Provider value={{codigo, ChangeCodigo}}>{children}</CodigoContext.Provider>)
        
    
}