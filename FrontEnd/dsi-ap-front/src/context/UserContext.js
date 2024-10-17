import { createContext, useState } from "react";

export const UserContext= createContext();

export const UserProvider= ({children})=>{
    const[userId, setUserId]=useState(0)

    const ChangeUser=(valor)=>{
        setUserId(valor)
    }

    return(<UserContext.Provider value={{userId, ChangeUser}}>{children}</UserContext.Provider>)
        
    
}