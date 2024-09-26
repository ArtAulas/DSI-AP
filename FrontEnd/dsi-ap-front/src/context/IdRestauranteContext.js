import { createContext, useState } from "react";

export const IdRestContext= createContext();

export const IdRestProvider= ({children})=>{
    const[restId, setRestId]=useState(0)

    const ChangeRest=(valor)=>{
        setRestId(valor)
    }

    return(<UserContext.Provider value={{restId, ChangeRest}}>{children}</UserContext.Provider>)
        
    
}