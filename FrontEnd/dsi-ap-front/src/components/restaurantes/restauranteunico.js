import { useContext,useEffect,useState } from "react"
import { IdRestContext } from "../../context/IdRestauranteContext"

export default function RestauranteUnico(){
    const{restId}=useContext(IdRestContext)
    const [retorno, setRetorno]=useState([])

    const busca=async()=>{
        let url='http://127.0.0.1:8003/restaurantes/buscar/id/'+restId
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
    }

    useEffect(() => {
        busca();
        },[]);

    return(
        <div id="info_restaurante">
        <h1>{retorno.nome_restaurante}</h1>
        Especialidade: {retorno.especialidade_restaurante}<br/>
        <b>Informações para Contato:</b><br/>
        Telefone: {retorno.telefone_restaurante}<br/>
        Email: {retorno.email_restaurante}<br/>
        <b>Localidade:</b> {retorno.cidade_restaurante}, {retorno.estado_restaurante}
        </div>
    )
}