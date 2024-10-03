import { useState,useEffect,useContext } from "react"
import { Link,useNavigate } from "react-router-dom"
import { IdRestContext } from "../context/IdRestauranteContext"

export default function PaginaInicial(){
    let navigate=useNavigate()
    const {ChangeRest}=useContext(IdRestContext)
    const [retorno,setRetorno]=useState([])

    const busca=async()=>{
        let url='http://127.0.0.1:8003/restaurantes/buscar'
        let response=await fetch(url)
        let lista=await response.json()
        setRetorno(lista)
    }

    const resetaRest=()=>{
        ChangeRest(0)
    }

    useEffect(() => {
        busca();
        resetaRest();
        },[]);

    function RedirecionaRestaurante(e){
        ChangeRest(e.target.value)
        navigate('/pagina_restaurante')
    }

    return(
        <>
        <nav>
            <Link to='/usuario'>
            <button>Dados de Usuário</button>
            </Link>
        </nav>
        <main>
        <h1>Listagem de Restaurante</h1>
        <div id="lista">
        {retorno.map(item=>{
            return(
                <ul key={item.id}>
                    <b>Informações Básicas:</b>
                    <li key={item.id+'nome'}>Nome: {item.nome_restaurante}</li>
                    <li key={item.id+'especi'}>Escpecialidade: {item.especialidade_restaurante}</li>
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
                    <button onClick={RedirecionaRestaurante} value={item.id_restaurante}>Visualizar Página do Restaurante</button>
                </ul>
            )
        })}</div>
        </main>
        </>
    )
}