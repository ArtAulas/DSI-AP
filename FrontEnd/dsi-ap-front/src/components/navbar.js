import { Link } from "react-router-dom"

export default function NavBar(){
    return(
        <nav>
        <Link to="Login">
            <button>Login</button>
        </Link>
        <Link to="/">
            <button>Home</button>
        </Link>
        <Link to="/cadastro">
            <button>Cadastro</button>
        </Link>
        </nav>
    )
}