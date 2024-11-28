import { Link } from "react-router-dom"

export default function HomePage(){
    return(
        <div>
        <Link to="Login">
            <button>Login</button>
        </Link>
        <br/>
        <Link to="/cadastro">
            <button>Cadastro</button>
        </Link>
        <br/>
        <Link to="/restaurante">
            <button>Gerenciamento Restaurante</button>
        </Link>
        <br/>
        <Link to='/relatorios'>
            <button>Relatórios</button>
        </Link>
        <br/>
        </div>
    )
}