import { useState,useEffect,useContext } from "react"
import { Link,useNavigate } from "react-router-dom"
import { IdRestContext } from "../context/IdRestauranteContext"
import { IdPedidoContext } from "../context/IdPedidoContext"
import { UserContext } from "../context/UserContext"

export default function PaginaInicial(){
    let navigate=useNavigate()
    const {ChangeRest}=useContext(IdRestContext)
    const {pedidoId, ChangePedido}=useContext(IdPedidoContext)
    const {userId, ChangeUser}=useContext(UserContext)
    const [retorno,setRetorno]=useState([])

    const busca=async()=>{
        let url='http://127.0.0.1:8003/restaurantes/buscar'
        let response=await fetch(url)
        let lista=await response.json()
        setRetorno(lista)
    }

    const resetaRest=()=>{
        ChangeRest(0)
    }

    const verificaPedido=async()=>{
        let pedido=await fetch('http://127.0.0.1:8003/pedidos/buscar/id_user_status/'+userId);
        let retorno=await pedido.json()

        if (retorno==null){
            let url='http://127.0.0.1:8003/pedidos/inserir'
            let api=await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "forma_de_pagamento": 0,
                "id_usuario": userId,
                "id_endereco": 0,
                "id_restaurante": 0,
                "pagamento_gorjeta": 0,
                "cpf_na_nota": 0,
                "codigo_cupom": "",
                "entrega_padrao": true,
                "entrega_agendada": true,
                "retirar_na_loja": true,
                "total_produtos": 0,
                "taxa_servico": 0,
                "data_e_hora_pedido": "",
                "total_pedido": 0,
                "status": "Aberto"
              })
        })
        if (api.ok){
            pedido=await fetch('http://127.0.0.1:8003/pedidos/buscar/id_user_status/'+userId)
            retorno=await pedido.json()
        }
        }
        console.log(retorno.id_pedido)
        ChangePedido(retorno.id_pedido)
    }

    useEffect(() => {
        busca();
        resetaRest();
        verificaPedido();
        },[]);

    function RedirecionaRestaurante(e){
        ChangeRest(e.target.value)
        navigate('/pagina_restaurante')
    }

    return(
        <>
        <nav>
            <Link to='/usuario'>
            <button>Dados de Usuário</button>
            </Link>
            <Link to='/pedido'>
            <button>Ver Pedido</button>
            </Link>
        </nav>
        <main>
        <h1>Listagem de Restaurante</h1>
        <div id="lista">
        {retorno.map(item=>{
            return(
                <ul key={item.id} className="restaurantes_lista">
                    <b>Informações Básicas:</b>
                    <li key={item.id+'nome'}>Nome: {item.nome_restaurante}</li>
                    <li key={item.id+'especi'}>Escpecialidade: {item.especialidade_restaurante}</li>
                    <b>Informações Legais:</b>
                    <li key={item.id+'razao'}>Razão Social: {item.razao_social_restaurante}</li>
                    <li key={item.id+'cnpj'}>CNPJ: {item.cnpj_restaurante}</li>
                    <b>Informações para Contato</b>
                    <li key={item.id+'tel'}>Telefone: {item.telefone_restaurante}</li>
                    <li key={item.id+'email'}>Email: {item.email_restaurante}</li>
                    <b>Localidade:</b>
                    <li key={item.id+'cep'}>CEP: {item.cep_restaurante}</li>
                    <li key={item.id+'cidade'}>Cidade: {item.cidade_restaurante}, {item.estado_restaurante}</li>
                    <b>Plano de Entrega:</b>
                    {item.plano_basico_restaurante ? (<li key={item.id+'plano'}>Plano Básico</li>)
                    :(<li key={item.id+'plano'}>Plano Entrega</li>)}
                    <button onClick={RedirecionaRestaurante} value={item.id_restaurante}>Visualizar Página do Restaurante</button>
                </ul>
            )
        })}</div>
        </main>
        </>
    )
}