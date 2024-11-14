import BarGraph from "../components/Bar"
import { useNavigate} from "react-router-dom"

export default function Relat3(){

    let navigate=useNavigate()
    function voltar(){
        navigate(-1)
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button>
        <h1>Relatório 3</h1>
        <BarGraph/>
        </>
    )
}