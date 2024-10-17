import { Link } from "react-router-dom"

export default function HomePage(){
    return(
        <div>
        <Link to="Login">
            <button>Login</button>
        </Link>
        
        <Link to="/cadastro">
            <button>Cadastro</button>
        </Link>
        <Link to="/restaurante">
            <button>Gerenciamento Restaurante</button>
        </Link>
        </div>
    )
}