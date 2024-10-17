import Logar from "../components/usuario/logar"
import { Link } from "react-router-dom"
export default function Login(){
    return(
        <>
        <Link to="/">
            <button>Home</button>
        </Link>
        <Logar/>
        </>
    )
}