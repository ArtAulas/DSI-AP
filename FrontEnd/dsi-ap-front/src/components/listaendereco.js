import { useContext, useState,useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function ListaEndereco(){
    const {userId, ChangeUser}=useContext(UserContext)
    const[retorno,setRetorno]=useState([])

    const busca=async()=>{
        let url='http://127.0.0.1:8003/endereco/buscar/id_user/'+userId
        let response=await fetch(url)
        let lista=await response.json()
        setRetorno(lista)
        console.log(lista)
    }

    useEffect(() => {

        busca();
        
        },[]);

    const handleClick=(e)=>{
        console.log(e.target.value)
    }
    return(
        <>
        <h2>Endereços Do Usuário</h2>
        {retorno.map(item=>{
            return(
                <ul key={item.id}>
                    <li key={item.id+'endereco'}>{item.logradouro} {item.numero}, {item.complemento}</li>
                    <li key={item.id+'tipo'}>Tipo de Residência:
                        {item.endereco_casa ? (<>Casa</>) : (<></>)} 
                        {item.endereco_trabalho ? (<>Trabalho</>): (<></>)}
                    </li>
                    <button value={item.id_endereco} onClick={handleClick}>Atualizar Endereço</button>
                    <button value={item.id_endereco} onClick={handleClick}>Remover Endereço</button>
                </ul>
            )
        })}
        </>
    )
}