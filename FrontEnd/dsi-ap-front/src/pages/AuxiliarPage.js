import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Auxiliar(){
    let navigate=useNavigate()

    useEffect(()=>{
        navigate(-1)
    },[]);
}