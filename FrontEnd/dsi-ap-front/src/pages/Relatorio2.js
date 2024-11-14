import LineGraph from "../components/Line"
import { useNavigate} from "react-router-dom"

export default function Relat2(){

    let navigate=useNavigate()
    function voltar(){
        navigate(-1)
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button>
        <h1>Relatório 2</h1>
        <LineGraph/>
        </>
    )
}