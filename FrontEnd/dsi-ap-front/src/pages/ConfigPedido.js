import { IdPedidoConfigContext } from "../context/IdPedidoConfigContext"
import { useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ConfigPedido(){
    let navigate=useNavigate()
    const {pedidoConfigId}=useContext(IdPedidoConfigContext)

    let [total, setTotal]=useState(0)
    let [itens,setItens]=useState([])
    let [pedido,setPedido]=useState([])

    const voltar=()=>{
        navigate(-1)
    }

    const buscaItens=async()=>{
        let url='http://127.0.0.1:8003/itens_pedido/buscar/id_pedido/'+pedidoConfigId
        let api=await fetch(url)
        let data=await api.json()
        setItens(data)
        let tempTotal=0
        for (let i in data){
            tempTotal=tempTotal+(data[i].quantidade_produto*data[i].preco_produto)
        }
        setTotal(tempTotal)
    }

    const buscaPedido=async()=>{
        let url='http://127.0.0.1:8003/pedidos/buscar/id/'+pedidoConfigId
        let api=await fetch(url)
        let data=await api.json()
        setPedido(data)
    }

    useEffect(()=>{
        buscaItens();
        buscaPedido();
    },[])

    const patchPedido=async(status)=>{
        let url='http://127.0.0.1:8003/pedidos/status/'+pedidoConfigId
        let api=await fetch(url,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "status": status
              })
        })
        if (api.ok){
            alert('Status Atualizado')
            navigate("/auxiliar")
        }
    }

    const mudaStatus=()=>{
        let text='Insira o novo Status do Pedido'
        let status=prompt(text)
        patchPedido(status)
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button>
        <h1>Informações do Pedido</h1>
        Data: {pedido.data_e_hora_pedido}<br/>
        Status: {pedido.status}<br/>
        <button onClick={mudaStatus}>Mudar Status</button>
        <h2>Itens do Pedido:</h2>
        <div>
        {itens.map(item=>{
                return(
                    <ul key={item.id} className="lista_itens_pedido">
                        <li key={item.id+'nome'}>{item.nome_produto}</li>
                        <li key={item.id+'preco'}>Preço Unitário:R${item.preco_produto}</li>
                        <li key={item.id+'qtd'}>Quantidade:{item.quantidade_produto}</li>
                    </ul>
                )
            })}
        </div>
        <p><b>Total da Compra:</b> R${total.toFixed(2)}</p>
        </>
        )
}