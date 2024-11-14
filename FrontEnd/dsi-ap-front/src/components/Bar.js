import { Bar } from "react-chartjs-2"
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from "chart.js"
import { useState } from "react"
import { useEffect } from "react"

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)
const option={
    responsive:true,
    mantainAspectRatio:true,
    plugins:{
        legend:{
            position:'bottom',
            displayColor:false
        },
        title:{
            display:true,
            text:'Quantidade de Pedidos X Restaurante'
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

export default function BarGraph(){
    const [retorno,setRetorno]=useState([])

    let [diaI,setDataI]=useState('')
    const dataIChange=(e)=>{
        setDataI(e.target.value)
    }
    let [diaF,setDataF]=useState('')
    const dataFChange=(e)=>{
        setDataF(e.target.value)
    }
    let [dia,setData]=useState('')
    const dataChange=(e)=>{
        setData(e.target.value)
    }

    let [espec,setEspec]=useState('')
    const EspecChange=(e)=>{
        setEspec(e.target.value)
    }

    const buscaDados=async()=>{
        let url='http://127.0.0.1:8003/relatorios/relatorio3/sem_filtro'
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
    }

    useEffect(()=>{
        buscaDados();
    },[])

    const buscaPeriodo=async()=>{
        if (diaI==='' || diaF===''){
            return alert('Selecione um dia')
        }
        let url='http://127.0.0.1:8003/relatorios/relatorio3/periodo/'+diaI+'/'+diaF
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
    }

    const buscaData=async()=>{
        if (dia===''){
            return alert('Selecione um dia')
        }
        let url='http://127.0.0.1:8003/relatorios/relatorio3/data/'+dia
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
    }

    const buscaEspec=async()=>{
        if (espec===''){
            return alert('Defina uma Especialidade')
        }
        let url='http://127.0.0.1:8003/relatorios/relatorio3/especialidade/'+espec
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
    }

    const BarChartData={
        labels:retorno.map(row=>row.restaurante),
        datasets:[
            {
                label:'Pedidos',
                data:retorno.map(row=>row.qtd_vendida),
                backgroundColor:['lightcoral',  'lightblue','lightgreen',   'pink'],
                borderColor:    ['coral',       "blue",     'green',        'red'],
                borderWidth:1
            }
        ]
    }

    return(
        <>
        <button onClick={buscaDados}>Reiniciar</button><br/>
        <label>Especialidade Restaurante</label>
        <input onChange={EspecChange}/>
        <div className="filtro_relat">
            <label>Selecione Data Inicial</label>
            <input type="date" onChange={dataIChange}/><br/>
            <label>Selecione Data Final</label>
            <input type="date" onChange={dataFChange}/><br/>
        </div>
        <button>Filtrar</button>
        
        <Bar style={{height:"500px"}} options={option} data={BarChartData}/>
        </>
    )
}