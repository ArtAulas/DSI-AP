import { Line } from "react-chartjs-2"
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend } from "chart.js"
import { useState } from "react"
import { useEffect } from "react"

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend)
const option={
    responsive:true,
    mantainAspectRatio:true,
    plugins:{
        legend:{
            position:'bottom'
        },
        title:{
            display:true,
            text:'Faturamento X Dias'
        },
        tooltip:{
            titleAlign:'center',
            borderColor:'black',
            borderWidth:1,
            backgroundColor:'white',
            titleColor:'black',
            bodyColor:'black',
            displayColors:false
        }
    }
};

export default function LineGraph(){
    const [retorno,setRetorno]=useState([])
    const [filtro,setFiltro]=useState('Busca Geral')

    let [idRest,setIdRest]=useState(0)
    const idRestChange=(e)=>{
        setIdRest(e.target.value)
    }

    let [diaI,setDataI]=useState('')
    const dataIChange=(e)=>{
        setDataI(e.target.value)
    }
    let [diaF,setDataF]=useState('')
    const dataFChange=(e)=>{
        setDataF(e.target.value)
    }

    const buscaDados=async()=>{
        let url='http://127.0.0.1:8003/relatorios/relatorio2/sem_filtro'
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setFiltro('Busca Geral')
    }

    const buscaRest=async()=>{
        let url='http://127.0.0.1:8003/relatorios/relatorio2/restaurante/'+idRest
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setFiltro('Busca por Restaurante')
    }

    const buscaPeriodo=async()=>{
        if (diaI==='' || diaF===''){
            buscaDados();
            return alert('Selecione um dia')
        }
        let url='http://127.0.0.1:8003/relatorios/relatorio2/periodo/'+diaI+'/'+diaF
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setFiltro('Busca por Período')
    }

    const buscaCompleta=async()=>{
        let url='http://127.0.0.1:8003/relatorios/relatorio2/completo/'+diaI+'/'+diaF+'/'+idRest
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
        setFiltro('Busca Completa')
    }

    useEffect(()=>{
        buscaDados();
    },[])

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

    const lineChartData={
        labels:retorno.map(row=>row.dia),// for row in retorno
        datasets:[
            {
                label:'Faturamento em R$',
                data:retorno.map(row=>row.faturamento),
                borderColor:"midnightblue",
                backgroundColor:"red"
            }
        ]
    }

    return(
        <>
        <button onClick={buscaDados}>Reiniciar</button>
        <br/>
        <label>Id Restaurante</label>
        <input type='number' onChange={idRestChange}/>
        <br/>
        <div className="filtro_relat">
            <label>Selecione Data Inicial</label>
            <input type="date" onChange={dataIChange}/><br/>
            <label>Selecione Data Final</label>
            <input type="date" onChange={dataFChange}/><br/>
        </div>
        <button onClick={buscar}>Filtrar</button>
        <h1>{filtro}</h1>
        <Line style={{height:"500px"}} options={option} data={lineChartData}/>
        </>
    )
}