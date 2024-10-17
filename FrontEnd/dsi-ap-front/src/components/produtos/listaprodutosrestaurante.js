import { useContext,useEffect,useState } from "react"
import { IdRestContext } from "../../context/IdRestauranteContext"
import { IdPedidoContext } from "../../context/IdPedidoContext"
import { IdRestPedidoContext } from "../../context/RestaurantePedidoContext"

export default function ListaProdutosRestaurante(){
    const{restId}=useContext(IdRestContext)
    const{restIdpedido, ChangeRestPedido}=useContext(IdRestPedidoContext)
    const {pedidoId}=useContext(IdPedidoContext)
    const [retorno, setRetorno]=useState([])


    const busca=async()=>{
        let url='http://127.0.0.1:8003/produtos/buscar/id_restaurante/'+restId
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
    }

    useEffect(() => {
        busca();
        },[]);

    const addItem=async(e)=>{
        if(restId!=restIdpedido && restIdpedido!=0){
            return alert('Você não pode incluir diferentes restaurantes no mesmo pedido')
        }
        ChangeRestPedido(restId)
        let a=e.target.value
        a=a.split(',')
        let retornoitem=await fetch('http://127.0.0.1:8003/itens_pedido/buscar/pedido_produto/'+a[0]+'/'+pedidoId)
        let item=await retornoitem.json()

        if(item==null){
            let url='http://127.0.0.1:8003/itens_pedido/inserir'
            let api=await fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    "id_produto": parseInt(a[0]),
                    "nome_produto": a[2],
                    "preco_produto": parseFloat(a[1]),
                    "quantidade_produto": 1,
                    "id_pedido": pedidoId
                })
            })
            if (api.ok){
                alert('Produto Adicionado ao Pedido')
            }else{
                alert('Erro ao Adcionar')
            }
        }else{
            let url='http://127.0.0.1:8003/itens_pedido/atualizar/'+item.id_item_pedido
            let api=await fetch(url,{
                method:'PUT',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    "id_produto": item.id_produto,
                    "nome_produto": item.nome_produto,
                    "preco_produto": item.preco_produto,
                    "quantidade_produto": item.quantidade_produto+1,
                    "id_pedido": pedidoId
                })
            })
            if (api.ok){
                alert('Produto Adicionado ao Pedido')
            }else{
                alert('Erro ao Adcionar')
            }
        }
    }

    return(
        <div className="lista_produtos">
        {retorno.map(item=>{
            return(
                <ul key={item.id} className="itens_lista_produtos">
                    <li name='nome' key={item.id+'nome'}>Nome: {item.nome_produto}</li>
                    <li name='desc' key={item.id+'descricao'}>Descrição: {item.descricao_produto}</li>
                    <li name='categoria' key={item.id+'categoria'}>Categoria: {item.categoria_produto}</li>
                    <li name ='preco' key={item.id+'preco'}>Preço: {item.preco_produto}</li>
                    {item.denunciar_produto 
                    ? (<li key={item.id+'denuncia'}>Produto foi denunciado</li>)
                    :(<></>)}
                    <button value={[item.id_produto,item.preco_produto,item.nome_produto]} onClick={addItem}>Adicionar a Sacola</button>
                </ul>
                
            )
        })}
        </div>
    )
}