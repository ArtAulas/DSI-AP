import { PedidoPaginaContext } from "../context/IdPedidoPagina"
import { useContext,useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function PedidoAntigo(){
    const {pedidoIdpage}=useContext(PedidoPaginaContext)
    let [itens,setItens]=useState([])
    let [pedido,setPedido]=useState([])
    let [endereco,setEndereco]=useState([])
    let [restaurante,setRestaurante]=useState([])

    let navigate=useNavigate()
    function voltar(){
        navigate(-1)
    }

    const buscaItens=async()=>{
        let url='http://127.0.0.1:8003/itens_pedido/buscar/id_pedido/'+pedidoIdpage
        let api=await fetch(url)
        let data=await api.json()
        setItens(data)
    }

    const buscaPedido=async()=>{
        let url='http://127.0.0.1:8003/pedidos/buscar/id/'+pedidoIdpage
        let api=await fetch(url)
        let data=await api.json()
        setPedido(data)
    }

    const buscaRestaurante=async()=>{
        let rest=pedido.id_restaurante
        let url='http://127.0.0.1:8003/restaurantes/buscar/id/'+rest
        let api=await fetch(url)
        let data=await api.json()
        setRestaurante(data)
    }

    const buscaEndereco=async()=>{
        let ende=pedido.id_endereco
        let url='http://127.0.0.1:8003/endereco/buscar/id/'+ende
        let api=await fetch(url)
        let data=await api.json()
        setEndereco(data)
    }

    useEffect(()=>{
        buscaItens();
        buscaPedido();
    },[]);

    useEffect(()=>{
        if (pedido.id_restaurante){    
            buscaRestaurante();
            buscaEndereco();
        }
    },[pedido]);

    return(
        <>
        <nav>
            <button onClick={voltar}>Voltar</button>
        </nav>
        <h1>Detalhes do Pedido</h1>
        Status do Pedido: {pedido.status}<br/>
        Valor do Pedido: R${pedido.total_pedido}
        <h2>Endereço de Entrega</h2>
        {endereco.logradouro} {endereco.numero}
        {(endereco.complemento=='')?(<></>):(<> , {endereco.complemento}</>)}
        <h2>Informações do Restaurante</h2>
        Nome: {restaurante.nome_restaurante}<br/>
        Localidade:{restaurante.cidade_restaurante},{restaurante.estado_restaurante}<br/>
        Contatos:
        <ul>
            <li key='tele'>Telefone: {restaurante.telefone_restaurante}</li>
            <li key='mail'>Email: {restaurante.email_restaurante}</li>
        </ul>
        <h2>Itens de Pedido</h2>
        {itens.map(item=>{
                return(
                    <ul key={item.id} className="lista_itens_pedido">
                        <li key={item.id+'nome'}>{item.nome_produto}</li>
                        <li key={item.id+'preco'}>Preço Unitário:R${item.preco_produto}</li>
                        <li key={item.id+'qtd'}>Quantidade:{item.quantidade_produto}</li>
                    </ul>
                )
            })}
        </>
    )
}