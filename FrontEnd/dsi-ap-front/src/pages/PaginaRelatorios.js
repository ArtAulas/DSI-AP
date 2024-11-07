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
        <button>Relatório 1</button>
        </Link>
        </>
    )
}