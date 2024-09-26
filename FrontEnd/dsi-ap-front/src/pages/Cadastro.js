import Cadastro from "../components/usuario/cadastrar"
import { Link } from "react-router-dom"

export default function CadastroPage(){
    return(
        <>
        <Link to="/">
            <button>Home</button>
        </Link>
        <Cadastro/>
        </>
    )
}