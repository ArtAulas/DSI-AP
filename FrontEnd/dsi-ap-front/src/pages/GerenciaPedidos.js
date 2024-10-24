import { useNavigate } from "react-router-dom"
import { useState,useContext } from "react"
import { IdPedidoConfigContext } from "../context/IdPedidoConfigContext"

export default function GerenciaPedidos(){
    let navigate=useNavigate()
    const[id,setId]=useState(0)
    const idChange=(e)=>{
        setId(e.target.value)
    }
    const[pedidos,setPedidos]=useState([])

    const {pedidoConfigId, ChangePedidoConfig}=useContext(IdPedidoConfigContext)

    const voltar=()=>{
        navigate(-1)
    }

    const busca=async()=>{
        let url='http://127.0.0.1:8003/pedidos/buscar/id_restaurante/'+id
        let api=await fetch(url)
        let data=await api.json()
        setPedidos(data)
    }

    const redirecionaPedido=(e)=>{
        ChangePedidoConfig(e.target.value)
        navigate('/configpedido')
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button>
        <label>Insira o ID do restaurante</label>
        <input type="number" value={id} onChange={idChange}></input>
        <button onClick={busca}>Buscar Pedidos</button>
        {pedidos.map(pedido=>{
            return(
                <ul>
                    <li>ID:{pedido.id_pedido}</li>
                    <li>Status:{pedido.status}</li>
                    <li>Data:{pedido.data_e_hora_pedido}</li>
                    <button value={pedido.id_pedido} onClick={redirecionaPedido}>Ver pedido Completo</button>
                </ul>
            )
        })}
        </>
    )
}