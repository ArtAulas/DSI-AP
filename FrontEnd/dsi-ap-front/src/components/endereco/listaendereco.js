import { useContext, useState,useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { EnderecoContext } from "../../context/EnderecoContext";
import { useNavigate } from "react-router-dom";

export default function ListaEndereco(){
    const {userId, ChangeUser}=useContext(UserContext)
    const {enderecoId, ChangeEndereco}=useContext(EnderecoContext)
    const[retorno,setRetorno]=useState([])
    let navigate=useNavigate()

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

    const ConfirmDeletar=(e)=>{
        let text = "Confirma a Deleção?";
        if(window.confirm(text)===true){
            Deletar(e)
        }else{
            alert('Você Cancelou a Deleção')
        }
    }

    const Deletar=async(e)=>{
        let id=e.target.value
        let api = await fetch('http://127.0.0.1:8003/endereco/apagar/'+id,{
            method:"DELETE",
            headers:{
              "Content-Type": "application/json"
            },
          })
          alert('Endereco Deletado')
    }
    
    const DirecionaAtualiza=(e)=>{
        ChangeEndereco(e.target.value)
        navigate('/atualizaendereco')
    }

    return(
        <>
        <h2>Endereços Do Usuário</h2>
        {retorno.map(item=>{
            return(
                <ul key={item.id}>
                    <li key={item.id+'endereco'}>{item.logradouro} {item.numero}, {item.complemento}</li>
                    <li key={item.id+'ref'}>Ponto de Referência: {item.ponto_de_referencia}</li>
                    <li key={item.id+'tipo'}>Tipo de Residência:
                        {item.endereco_casa ? (<>Casa</>) : (<></>)} 
                        {item.endereco_trabalho ? (<>Trabalho</>): (<></>)}
                    </li>
                    <button value={item.id_endereco} onClick={DirecionaAtualiza}>Atualizar Endereço</button>
                    <button value={item.id_endereco} onClick={ConfirmDeletar}>Remover Endereço</button>
                </ul>
            )
        })}
        </>
    )
}