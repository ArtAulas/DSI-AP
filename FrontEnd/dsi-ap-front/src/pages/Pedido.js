import { useContext,useEffect,useState } from "react"
import { IdPedidoContext } from "../context/IdPedidoContext"
import { IdRestPedidoContext } from "../context/RestaurantePedidoContext"
import { Link,useNavigate } from "react-router-dom"

export default function PedidoPage(){
    const {pedidoId}=useContext(IdPedidoContext)
    const{ChangeRestPedido}=useContext(IdRestPedidoContext)
    const [retorno, setRetorno]=useState([])
    let total=0
    const [total2, setTotal]=useState(0)
    let navigate=useNavigate()
    
    const busca=async()=>{
        let url='http://127.0.0.1:8003/itens_pedido/buscar/id_pedido/'+pedidoId
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        for (let i in data){
            total=total+(data[i].quantidade_produto*data[i].preco_produto)
        }
        setTotal(total)
    }
    
    useEffect(()=>{
        busca();
    },[]);

    const RemoveItem=async(e)=>{
        let id=e
        if(typeof(e)==='object'){
            id=e.target.value
        }
        let api = await fetch('http://127.0.0.1:8003/itens_pedido/apagar/'+id,{
            method:"DELETE",
            headers:{
              "Content-Type": "application/json"
            },
          })
        if (api.ok){
            alert('Item Removido')
            if(retorno.length===1){
                ChangeRestPedido(0)
            }
            navigate("/auxiliar", { state: { from: 'pedido' } });
        }
    }

    const ConfirmRemove=(e)=>{
        let text = "Confirma a Remoção?";
        if(window.confirm(text)===true){
            RemoveItem(e)
        }else{
            alert('Você Cancelou a Remoção')
        }
    }

    const alteraQtd=async(e)=>{
        let a=e.target.value.split(',')
        if(a[1]==0){
            return ConfirmRemove(a[0])
        }
        for (let i in retorno){
            if(retorno[i].id_item_pedido===parseInt(a[0])){
                let item=retorno[i]
                let url='http://127.0.0.1:8003/itens_pedido/atualizar/'+item.id_item_pedido
                let api = await fetch(url,{
                    method:"PUT",
                    headers:{
                      "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        "id_produto": item.id_produto,
                        "nome_produto": item.nome_produto,
                        "preco_produto": item.preco_produto,
                        "quantidade_produto": a[1],
                        "id_pedido": item.id_pedido
                      })
                  })
                if (api.ok){
                    navigate('/auxiliar')
                }else{
                    alert('Erro ao atualizar quantidade')
                }
            }
        }
    }

    return(
        <>
        <Link to='/paginainicial'>
        <button>Página Inicial</button>
        </Link>
        <h1>Itens de Pedido</h1>
        {retorno.map(item=>{
                return(
                    <ul key={item.id} className="lista_itens_pedido">
                        <li key={item.id+'nome'}>{item.nome_produto}</li>
                        <li key={item.id+'preco'}>Preço:R${item.preco_produto}</li>
                        <li key={item.id+'qtd'}>
                            Quantidade:<br/>
                            <button class='qtd_item' value={[item.id_item_pedido,item.quantidade_produto-1]} onClick={alteraQtd}>-</button>
                            {item.quantidade_produto}
                            <button class='qtd_item' value={[item.id_item_pedido,item.quantidade_produto+1]} onClick={alteraQtd}>+</button>
                        </li>
                        <button value={item.id_item_pedido} onClick={ConfirmRemove}><b>Remover Item</b></button>
                    </ul>
                )
            })}
        <p><b>Total da Compra:</b> R${total2.toFixed(2)}</p>
        </>
    )
}