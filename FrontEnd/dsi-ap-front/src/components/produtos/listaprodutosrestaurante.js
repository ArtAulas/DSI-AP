import { useContext,useEffect,useState } from "react"
import { IdRestContext } from "../../context/IdRestauranteContext"
import { IdPedidoContext } from "../../context/IdPedidoContext"

export default function ListaProdutosRestaurante(){
    const{restId}=useContext(IdRestContext)
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
        let a=e.target.value
        console.log(a.json())
        // let url='http://127.0.0.1:8003/itens_pedido/inserir'
        // let api=await fetch(url,{
        //     method:'POST',
        //     headers:{
        //          "Content-Type": "application/json"
        //     },
        //     body:JSON.stringify({
        //         "id_produto": parseInt(a[0]),
        //         "preco_produto": a[1],
        //         "quantidade_produto": 1,
        //         "id_pedido": pedidoId
        //       })
        // })
        // if (api.ok){
        //     alert('Produto Adicionado ao Pedido')
        // }else{
        //     alert('Erro ao Adcionar')
        // }
    }

    return(
        <div className="lista_produtos">
        {retorno.map(item=>{
            return(
                <ul key={item.id}>
                    <li key={item.id+'nome'}>Nome: {item.nome_produto}</li>
                    <li key={item.id+'descricao'}>Descrição: {item.descricao_produto}</li>
                    <li key={item.id+'categoria'}>Categoria: {item.categoria_produto}</li>
                    <li key={item.id+'preco'}>Preço: {item.preco_produto}</li>
                    {item.denunciar_produto 
                    ? (<li key={item.id+'denuncia'}>Produto foi denunciado</li>)
                    :(<></>)}
                    <button value={item} onClick={addItem}>Adicionar ao Pedido</button>
                </ul>
            )
        })}
        </div>
    )
}