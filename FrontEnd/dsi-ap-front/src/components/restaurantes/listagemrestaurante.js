import { useState } from "react"
import { Link } from "react-router-dom"

export default function ListaRestaurante(){
    const[retorno,setRetorno]=useState([])

    const busca=async()=>{
        let url='http://127.0.0.1:8003/restaurantes/buscar'
        let response=await fetch(url)
        let lista=await response.json()
        setRetorno(lista)
    }

    return(
        <>
        <Link to='/restaurante'>
            <button>Voltar</button>
        </Link>
        <button onClick={busca}>Listar Restaurantes</button>
        <div id="lista">
        {retorno.map(item=>{
            return(
                <ul key={item.id}>
                    <li key={item.id+'id'}>ID: {item.id_restaurante}</li>
                    <b>Informações Básicas:</b>
                    <li key={item.id+'nome'}>Nome: {item.nome_restaurante}</li>
                    <li key={item.id+'especi'}>Especialidade: {item.especialidade_restaurante}</li>
                    <b>Informações Legais:</b>
                    <li key={item.id+'razao'}>Razão Social: {item.razao_social_restaurante}</li>
                    <li key={item.id+'cnpj'}>CNPJ: {item.cnpj_restaurante}</li>
                    <b>Informações para Contato</b>
                    <li key={item.id+'tel'}>Telefone: {item.telefone_restaurante}</li>
                    <li key={item.id+'email'}>Email: {item.email_restaurante}</li>
                    <b>Localidade:</b>
                    <li key={item.id+'cep'}>Cep: {item.cep_restaurante}</li>
                    <li key={item.id+'cidade'}>Cidade: {item.cidade_restaurante}, {item.estado_restaurante}</li>
                    <b>Plano de Entrega:</b>
                    {item.plano_basico_restaurante ? (<li key={item.id+'plano'}>Plano Básico</li>)
                    :(<li key={item.id+'plano'}>Plano Entrega</li>)}
                </ul>
            )
        })}</div>
        </>
    )
}