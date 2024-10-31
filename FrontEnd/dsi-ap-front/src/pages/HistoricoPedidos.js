import { Navigate, useNavigate } from "react-router-dom"
import { useEffect,useState,useContext } from "react"
import { UserContext } from "../context/UserContext"
import { PedidoPaginaContext } from "../context/IdPedidoPagina"

export default function HistoricoPedidos(){
    const [retorno, setRetorno]=useState([])
    const {userId}=useContext(UserContext)
    const {pedidoIdpage, ChangePedidoPage}=useContext(PedidoPaginaContext)

    let navigate=useNavigate()
    function voltar(){
        navigate(-1)
    }

    const busca=async()=>{
        let url='http://127.0.0.1:8003/pedidos/buscar/id_user_restaurante/'+userId
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
    }

    useEffect(()=>{
        busca();
    },[])

    const redirecionaPaginaPedido=(e)=>{
        ChangePedidoPage(e.target.value)
        navigate('/pedidoanterior')
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button>
        <h1>Histórico de Pedidos</h1>
        {retorno.map(item=>{
            return(
                <ul key={item.id}>
                    <li key={item.id+'data'}>Data:{item.data_e_hora_pedido}</li>
                    <li key={item.id+'rest'}>Restaurante:{item.nome_restaurante}</li>
                    <li key={item.id+'status'}>Status:{item.status}</li>
                    <button onClick={redirecionaPaginaPedido} value={item.id_pedido} key={item.id+'button'}>Ver mais detalhes</button>
                </ul>
            )
        })}
        </>
    )
}