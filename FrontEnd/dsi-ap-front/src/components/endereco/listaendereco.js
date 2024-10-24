import { useContext, useState,useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { EnderecoContext } from "../../context/EnderecoContext";
import { EnderecoPedidoContext } from "../../context/EnderecoPedido";
import { useNavigate } from "react-router-dom";

export default function ListaEndereco(){
    const {userId, ChangeUser}=useContext(UserContext)
    const {enderecoId, ChangeEndereco}=useContext(EnderecoContext)
    const{enderecoPedidoId,ChangeEnderecoPedido}=useContext(EnderecoPedidoContext)
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
        if (id==enderecoPedidoId){
            ChangeEnderecoPedido(0)
        }
        let api = await fetch('http://127.0.0.1:8003/endereco/apagar/'+id,{
            method:"DELETE",
            headers:{
              "Content-Type": "application/json"
            },
          })
          alert('Endereco Deletado')
          navigate('/auxiliar')
    }
    
    const DirecionaAtualiza=(e)=>{
        ChangeEndereco(e.target.value)
        navigate('/atualizaendereco')
    }

    const selecionarEntrega=(e)=>{
        ChangeEnderecoPedido(e.target.value)
        alert('Endereço selecionado para entrega')
    }

    return(
        <>
        <h2>Endereços Do Usuário</h2>
        {retorno.map(item=>{
            let entrega=false
            if (item.id_endereco==enderecoPedidoId){
                entrega=true
            }
            return(
                <ul key={item.id} className="lista_enderecos">
                    <li key={item.id+'endereco'}>{item.logradouro} {item.numero}, {item.complemento}</li>
                    <li key={item.id+'ref'}>Ponto de Referência: {item.ponto_de_referencia}</li>
                    <li key={item.id+'tipo'}>Tipo de Residência:
                        {item.endereco_casa ? (<>Casa</>) : (<></>)} 
                        {item.endereco_trabalho ? (<>Trabalho</>): (<></>)}
                    </li>
                    <button value={item.id_endereco} onClick={DirecionaAtualiza}>Atualizar Endereço</button>
                    <button value={item.id_endereco} onClick={ConfirmDeletar}>Remover Endereço</button>
                    <br/>
                    {entrega?(<>Selecionado Para Entrega</>)
                    :(<button value={item.id_endereco} onClick={selecionarEntrega}>Selecionar para Entrega</button>)}
                </ul>
            )
        })}
        </>
    )
}