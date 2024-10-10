import { useContext,useEffect,useState } from "react"
import { IdPedidoContext } from "../context/IdPedidoContext"
import { Link } from "react-router-dom"

export default function PedidoPage(){
    const {pedidoId}=useContext(IdPedidoContext)
    const [retorno, setRetorno]=useState([])
    const [retorno2, setRetorno2]=useState([])
    let total=0
    const [total2, setTotal]=useState(0)

    const buscaProdutos=async()=>{
        console.log('ola')
        if (retorno.length==0){
            console.log('Pedido Vazio')
        }else{
            for(let i in retorno){
                let id_produto=retorno[i].id_produto
                let url='http://127.0.0.1:8003/produtos/buscar/id/'+id_produto
                let api=await fetch(url)
                let data2=await api.json()
                console.log(data2)
            }
        }
        }
    
    const busca=async()=>{
        let url='http://127.0.0.1:8003/itens_pedido/buscar/id_pedido/'+pedidoId
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        for (let i in data){
            total=total+(data[i].quantidade_produto*data[i].preco_produto)
        }
        setTotal(total)
        
        for(let i in retorno){
            let id_produto=retorno[i].id_produto
            let url='http://127.0.0.1:8003/produtos/buscar/id/'+id_produto
            let api=await fetch(url)
            let data2=await api.json()
            setRetorno2(data2)
        }
    }
    
    useEffect(()=>{
        busca();
    },[]);

    return(
        <>
        <Link to='/paginainicial'>
        <button>Voltar</button>
        </Link>
        <h2>Itens de Pedido</h2>
        {retorno.map(item=>{
            let id_prod=item.id_produto
            let url='http://127.0.0.1:8003/produtos/buscar/id/'+id_prod
            console.log(url)
                return(
                    <ul key={item.id}>
                        <li>{id_prod}</li>
                        <li key={item.id+'preco'}>Preço:R${item.preco_produto}</li>
                        <li key={item.id+'qtd'}>Quantidade:{item.quantidade_produto}</li>
                    </ul>
                )
            })}
        <p><b>Total da Compra:</b> R${total2}</p>
        </>
    )
}