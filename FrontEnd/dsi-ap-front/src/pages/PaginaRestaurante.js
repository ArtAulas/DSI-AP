import RestauranteUnico from "../components/restaurantes/restauranteunico"
import ListaProdutosRestaurante from "../components/produtos/listaprodutosrestaurante"
import { Link } from "react-router-dom"

export default function PaginaRestaurante(){

    return(
        <>
        <Link to='/paginainicial'>
        <button>Voltar</button>
        </Link><br/>
        <RestauranteUnico/><br/>
        <h2>Produtos Disponíveis:</h2>
        <ListaProdutosRestaurante/>
        </>
    )
}