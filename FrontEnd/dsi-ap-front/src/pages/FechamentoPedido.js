import { useNavigate } from "react-router-dom"
import { useContext,useState,useEffect } from "react"
import { EnderecoPedidoContext } from "../context/EnderecoPedido"
import { IdRestPedidoContext } from "../context/RestaurantePedidoContext"
import { IdPedidoContext } from "../context/IdPedidoContext"
import { UserContext } from "../context/UserContext"

export default function FechaPedidoPage(){
    let navigate=useNavigate()

    const{enderecoPedidoId}=useContext(EnderecoPedidoContext)
    const{restIdpedido, ChangeRestPedido}=useContext(IdRestPedidoContext)
    const {pedidoId, ChangePedido}=useContext(IdPedidoContext)
    const {userId}=useContext(UserContext)

    let [endereco,setEndereco]=useState([])
    let [restaurante,setRestaurante]=useState([])
    let [usuario,setUsuario]=useState([])

    let [itens,setItens]=useState([])
    let [total,setTotal]=useState(0)

    const voltar=()=>{
        navigate(-1)
    }

    const buscaEndereco=async()=>{
        let url='http://127.0.0.1:8003/endereco/buscar/id/'+enderecoPedidoId
        let api=await fetch(url)
        let data=await api.json()
        setEndereco(data)
    }

    const buscaRestaurante=async()=>{
        let url='http://127.0.0.1:8003/restaurantes/buscar/id/'+restIdpedido
        let api=await fetch(url)
        let data=await api.json()
        setRestaurante(data)
    }

    const buscaItensPedido=async()=>{
        let url='http://127.0.0.1:8003/itens_pedido/buscar/id_pedido/'+pedidoId
        let api=await fetch(url)
        let data=await api.json()
        setItens(data)
        let tempTotal=0
        for (let i in data){
            tempTotal=tempTotal+(data[i].quantidade_produto*data[i].preco_produto)
        }
        setTotal(tempTotal)
    }

    const buscaUsuario=async()=>{
        let api = await fetch('http://127.0.0.1:8003/usuarios/buscar/id/'+userId)
        let data=await api.json()
        setUsuario(data)
    }

    useEffect(()=>{
        buscaEndereco();
        buscaRestaurante();
        buscaItensPedido();
        buscaUsuario();
    },[])

    const FecharPedido=async()=>{
        let today=new Date();
        let dia=today.toISOString().slice(0,10)
        let url='http://127.0.0.1:8003/pedidos/atualizar/'+pedidoId
        let api= await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "forma_de_pagamento": 0,
                "id_usuario": userId,
                "id_endereco": enderecoPedidoId,
                "id_restaurante": restIdpedido,
                "pagamento_gorjeta": 0,
                "cpf_na_nota": usuario.cpf,
                "codigo_cupom": "",
                "entrega_padrao": true,
                "entrega_agendada": false,
                "retirar_na_loja": false,
                "total_produtos": total,
                "taxa_servico": 0,
                "data_e_hora_pedido": dia,
                "total_pedido": total,
                "status": "Enviado ao Restaurante"
              })
        })
        if (api.ok){
            alert('Pedido Enviado ao Restaurante')
            ChangePedido(0)
            ChangeRestPedido(0)
            navigate('/paginainicial')
        }
        else{
            alert('Erro ao Fechar Pedido')
        }
    }

    const confirmFecharPedido=()=>{
        let text = "Confirma o Fechamento do Pedido?";
        if(window.confirm(text)===true){
            FecharPedido();
        }else{
            alert('Você Cancelou a Operação')
        }
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button><br/>
        <h1>Fechamento de Pedido</h1>
        <h2>Endereço da Entrega:</h2>
            <p className="info_endereco">{endereco.logradouro} {endereco.numero}, {endereco.complemento}</p>
        <h2>Informações do Restaurante:</h2>
        <div className="info_restaurante">
            <p>{restaurante.nome_restaurante}</p>
            <p>CEP: {restaurante.cep_restaurante}</p>
            <p>{restaurante.cidade_restaurante}, {restaurante.estado_restaurante}</p>
            <p>Plano {restaurante.plano_basico_restaurante ? (<>Básico</>):(<>Entrega</>)}</p>
        </div>
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
        <button onClick={confirmFecharPedido}>Fechar Pedido</button>
        </>
    )
}