import { useNavigate} from "react-router-dom"
import { useEffect,useState } from "react"

export default function Relat1(){
    let [retorno,setRetorno]=useState([])
    let [dia,setData]=useState('')
    const dataChange=(e)=>{
        setData(e.target.value)
    }
    let [diaI,setDataI]=useState('')
    const dataIChange=(e)=>{
        setDataI(e.target.value)
    }
    let [diaF,setDataF]=useState('')
    const dataFChange=(e)=>{
        setDataF(e.target.value)
    }
    let [dtuniq,setDtUniq]=useState(false)
    let [dtperi,setDtPeri]=useState(false)

    let navigate=useNavigate()
    function voltar(){
        navigate(-1)
    }

    const buscaDados=async()=>{
        let url='http://127.0.0.1:8003/relatorios/relatorio1/sem_data'
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setDtUniq(false)
        setDtPeri(false)
    }

    useEffect(()=>{
        buscaDados();
    },[])

    const buscaData=async()=>{
        if (dia===''){
            return alert('Selecione um dia')
        }
        let url='http://127.0.0.1:8003/relatorios/relatorio1/com_data/'+dia
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setDtUniq(true)
        setDtPeri(false)
    }

    const buscaPeriodo=async()=>{
        if (diaI==='' || diaF===''){
            return alert('Selecione um dia')
        }
        let url='http://127.0.0.1:8003/relatorios/relatorio1/com_periodo/'+diaI+'/'+diaF
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setDtUniq(false)
        setDtPeri(true)
    }

    return(
        <>
        <button onClick={voltar}>Voltar</button>
        <h1>Relatório 1</h1>
        <button onClick={buscaDados}>Reiniciar</button>
        {dtuniq?(<h2>Buscando por Data Única</h2>):(dtperi?(<h2>Buscando por Período</h2>):(<h2>Busca Geral</h2>))}
        <div>
            <label>Selecione Data única</label>
            <input type="date" onChange={dataChange}/>
            <button onClick={buscaData}>Buscar por data específica</button>
        </div><br/>
        <div>
            <label>Selecione Data Inicial</label>
            <input type="date" onChange={dataIChange}/><br/>
            <label>Selecione Data Final</label>
            <input type="date" onChange={dataFChange}/>
            <button onClick={buscaPeriodo}>Buscar por período</button>
        </div><br/>
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
                    <td>R${item.Faturamento_Total}</td>
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