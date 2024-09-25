import { Link } from "react-router-dom"

export default function RestaurantePage(){
    return(
        <>
        <Link to='/'>
        <button>Voltar</button>
        </Link>
        <div id="opcoes_restaurante">
            <Link to='/cadastrorestaurante'>
            <button>Cadastro</button>
            </Link>
            <Link to='/listarestaurante'>
            <button>Listagem</button>
            </Link>
            <Link to='/atualizarestaurante'>
            <button>Atualização</button>
            </Link>
            <Link to='/deletarestaurante'>
            <button>Deleção</button>
            </Link>
        </div>
        </>
    )
}