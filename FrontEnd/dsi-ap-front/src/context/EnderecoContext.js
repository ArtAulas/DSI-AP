import { createContext, useState } from "react";

export const EnderecoContext= createContext();

export const EnderecoProvider= ({children})=>{
    const[enderecoId, setEnderecoId]=useState(0)

    const ChangeEndereco=(valor)=>{
        setEnderecoId(valor)
    }

    return(<EnderecoContext.Provider value={{enderecoId, ChangeEndereco}}>{children}</EnderecoContext.Provider>)
        
    
}