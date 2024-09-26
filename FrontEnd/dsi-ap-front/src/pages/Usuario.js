import { UserContext } from "../context/UserContext"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ListaEndereco from "../components/endereco/listaendereco"

export default function Usuario(){
    const {userId, ChangeUser}=useContext(UserContext)
    const [retorno, setRetorno]=useState([])
    let navigate=useNavigate()

    const ResetarId=()=>(
        ChangeUser(0)
    )

    const GetUserInfo=async()=>{
        let api = await fetch('http://127.0.0.1:8003/usuarios/buscar/id/'+userId)
        let data=await api.json()
        setRetorno(data)
        console.log(data)
    }

    const ConfirmDeletar=()=>{
        let text = "Confirma a Deleção?";
        if(window.confirm(text)===true){
            Deletar()
        }else{
            alert('Você Cancelou a Deleção')
        }
    }

    const Deletar=async()=>{
        let api = await fetch('http://127.0.0.1:8003/usuarios/apagar/'+userId,{
            method:"DELETE",
            headers:{
              "Content-Type": "application/json"
            },
          })
        alert('Usuário Deletado')
        ResetarId()
        navigate('/login')
    }
    

    useEffect(() => {

        GetUserInfo();
        
        },[]);
    
    return(
        <>
        <Link to='/paginainicial'>
        <button>Voltar</button>
        </Link>
        <h1>Dados do Usuário</h1>
        <ul>
                <li>Nome:{retorno.nome}  {retorno.sobrenome}</li>
                <li>Email:{retorno.email} </li>
                <li className="dt_confirm">Data de Confirmação:{retorno.dt_confirm_email}</li>
                
                <li>Telefone:{retorno.telefone} </li>
                <li  className="dt_confirm">Data de Confirmação:{retorno.dt_confirm_telefone}</li>
                <li>CPF:{retorno.cpf}</li>
        </ul>
            <Link to='/login'>
            <button onClick={ResetarId}>Deslogar</button>
            </Link>
            <Link to="/atualizar">
            <button>Atualizar Info</button>
            </Link>

            <button onClick={ConfirmDeletar}>Remover Cadastro</button>

            <Link to='/cadastroendereco'>
            <button>Cadastrar Endereco</button>
            </Link>

            <ListaEndereco/>
        
        </>
        
    )
}