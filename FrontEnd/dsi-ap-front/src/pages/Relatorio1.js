import { useNavigate} from "react-router-dom"
import { useEffect,useState } from "react"

export default function Relat1(){
    let [retorno,setRetorno]=useState([])
    const [filtro,setFiltro]=useState('Busca Geral')

    let [diaI,setDataI]=useState('')
    const dataIChange=(e)=>{
        setDataI(e.target.value)
    }
    let [diaF,setDataF]=useState('')
    const dataFChange=(e)=>{
        setDataF(e.target.value)
    }

    let [idRest,setIdRest]=useState(0)
    const idRestChange=(e)=>{
        setIdRest(e.target.value)
    }

    let navigate=useNavigate()
    function voltar(){
        navigate(-1)
    }

    const buscaDados=async()=>{
        let url='http://127.0.0.1:8003/relatorios/relatorio1/sem_data'
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setFiltro('Busca Geral')
    }

    useEffect(()=>{
        buscaDados();
    },[])

    const buscaPeriodo=async()=>{
        if (diaI==='' || diaF===''){
            buscaDados();
            return alert('Selecione um dia')
        }
        let url='http://127.0.0.1:8003/relatorios/relatorio1/com_periodo/'+diaI+'/'+diaF
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setFiltro('Busca Período')
    }

    const buscaRest=async()=>{
        let url='http://127.0.0.1:8003/relatorios/relatorio1/restaurante/'+idRest
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setFiltro('Busca Restaurante')
    }

    const buscaCompleta=async()=>{
        let url='http://127.0.0.1:8003/relatorios/relatorio1/completo/'+diaI+'/'+diaF+'/'+idRest
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setFiltro('Busca Completa')
    }

    const buscar=()=>{
        if (diaI==='' && diaF==='' && idRest==0){
            buscaDados();
        }
        if ((diaI==='' || diaF==='')&& idRest!=0){
            return buscaRest();
        }
        if (idRest==0){
            return buscaPeriodo();
        }
        buscaCompleta();
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button>
        <h1>Relatório 1</h1>
        <button onClick={buscaDados}>Reiniciar</button><br/>
        <label>Id Restaurante</label>
        <input type='number' onChange={idRestChange}/>
        <div className="filtro_relat">
            <label>Selecione Data Inicial</label>
            <input type="date" onChange={dataIChange}/><br/>
            <label>Selecione Data Final</label>
            <input type="date" onChange={dataFChange}/><br/>
        </div><br/>
        <button onClick={buscar}>Filtrar</button>
        <h1>{filtro}</h1>
        <table className="tab1">
            <tr>
                <td>Número</td>
                <td>Nome Produto</td>
                <td>Faturamento</td>
                <td>Preço Unitário</td>
                <td>Quantidade Total</td>
                <td>Restaurante</td>
                <td>Categoria</td>
            </tr>
        {retorno.map((item,index)=>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{item.Nome}</td>
                    <td>R${item.Faturamento_Total.toFixed(2)}</td>
                    <td>R${item.Preco_Unitario}</td>
                    <td>{item.Quantidade_Total}</td>
                    <td>{item.Restaurante}</td>
                    <td>{item.Categoria}</td>
                </tr>
            )
        })}
        </table>
        </>
    )
}