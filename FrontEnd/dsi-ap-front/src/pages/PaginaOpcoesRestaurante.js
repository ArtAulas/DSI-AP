import { Link } from "react-router-dom"
import { IdPedidoConfigContext } from "../context/IdPedidoConfigContext"
import { useContext,useEffect } from "react"

export default function RestauranteOpcoesPage(){
    const {ChangePedidoConfig}=useContext(IdPedidoConfigContext)

    useEffect(()=>{
        ChangePedidoConfig(0)
    },[])

    return(
        <>
        <Link to='/'>
        <button>Voltar</button>
        </Link><br/>
        <h1>Opções de Restaurante</h1>
        <div id="opcoes_restaurante">
            <Link to='/cadastrorestaurante'>
            <button>Cadastro de Restaurante</button>
            </Link>
            <Link to='/listarestaurante'>
            <button>Listagem  de Restaurante</button>
            </Link>
            <Link to='/atualizarestaurante'>
            <button>Atualização de Restaurante</button>
            </Link>
            <Link to='/deletarestaurante'>
            <button>Deleção de Restaurante</button>
            </Link>
        </div>
        <h2>Opções de Produto</h2>
        <div id="opcoes_produto">
            <Link to='/cadastroproduto'>
                <button>Cadastro de Produto</button>
            </Link>
            <Link to='/listaprodutos'>
                <button>Listagem  de Produtos</button>
            </Link>
            <Link to='/atualizaproduto'>
                <button>Atualização de Produtos</button>
            </Link>
            <Link to='/deletarproduto'>
                <button>Deleção de Produtos</button>
            </Link>
        </div>
        <h2>Opções Pedido</h2>
        <Link to='/gerenciapedido'>
        <button>Gerenciar Pedidos</button>
        </Link>
        </>
    )
}