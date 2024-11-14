import { useNavigate,Link } from "react-router-dom"
export default function PageRelat(){
    let navigate=useNavigate()
    function voltar(){
        navigate(-1)
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button>
        <h1>Página de Relatórios</h1>
        <Link to='/relat1'>
        <button>Faturamento Produtos</button>
        </Link>
        <Link to='/relat2'>
        <button>Faturamento X Dias</button>
        </Link>
        <Link to='/relat3'>
        <button>Quantidade Vendida X Restaurante</button>
        </Link>
        </>
    )
}