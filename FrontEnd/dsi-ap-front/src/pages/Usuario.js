import { UserContext } from "../context/UserContext"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
export default function Usuario(){
    const {userId, ChangeUser}=useContext(UserContext)
    const [retorno, setRetorno]=useState([])

    const Deslogar=()=>(
        ChangeUser(0)
    )

    const GetUserInfo=async()=>{
        let api = await fetch('http://127.0.0.1:8003/usuarios/buscar/id/'+userId)
        let data=await api.json()
        setRetorno(data)
        console.log(data)
    }

    useEffect(() => {

        GetUserInfo();
        
        },[]);
    
    return(
        <>
        <ul>
                <li>Nome:{retorno.nome}  {retorno.sobrenome}</li>
                <li>Email:{retorno.email}</li>
                <li>Telefone:{retorno.telefone}</li>
                <li>CPF:{retorno.cpf}</li>
        </ul>
            <Link to='/login'>
            <button onClick={Deslogar}>Deslogar</button>
            </Link>
        
        </>
    )
}