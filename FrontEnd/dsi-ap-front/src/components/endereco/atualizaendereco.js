import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate,Link } from "react-router-dom"
import { EnderecoContext } from "../../context/EnderecoContext"

export default function AtualizaEndereco(){
    let navigate=useNavigate()
	const{userId,ChangeUser}=useContext(UserContext)
    const {enderecoId, ChangeEndereco}=useContext(EnderecoContext)

    const[logradouro,setLogradouro]=useState('')
    const changeLogradouro=(e)=>{
        setLogradouro(e.target.value)
    }

    const[numero,setNumero]=useState(0)
    const changeNumero=(e)=>{
        setNumero(e.target.value)
    }

    const[complemento,setComplemento]=useState('')
    const changeComplemento=(e)=>{
        setComplemento(e.target.value)
    }

    const[referencia,setReferencia]=useState('')
    const changeReferencia=(e)=>{
        setReferencia(e.target.value)
    }
    const[tipo_res,setTipo]=useState('')
    const changeTipo=(e)=>{
        setTipo(e.target.value)
    }

    const salvar=async(e)=>{
        e.preventDefault();
        
        let casa=false
        let trabalho=false
        let tipo_res_temp=tipo_res.toLowerCase()

        if (tipo_res_temp=='casa'){
            casa=true
            console.log(casa,trabalho)
        }else if(tipo_res_temp=='trabalho'){
            trabalho=true
            console.log(casa,trabalho)
        }else if(tipo_res_temp==''){
            console.log(casa,trabalho)
        }else{
            alert('Tipo de Residência incompatível')
            return console.log(casa,trabalho)
        }

        let url='http://127.0.0.1:8003/endereco/cadastrar'
        let api=await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "logradouro": logradouro,
                "numero": numero,
                "complemento": complemento,
                "ponto_de_referencia": referencia,
                "endereco_casa": casa,
                "endereco_trabalho": trabalho,
                "id_usuario": userId
              })
        })

        let data=await api.json()
        console.log(data)
        if(api.ok){
            alert("Atualização Realizada Com Sucesso")
            navigate('/usuario')
          }else{
            return alert("Erro ao atualizar")
          }
    }

    const busca=async()=>{
        let url='http://127.0.0.1:8003/endereco/buscar/id/'+enderecoId
        let response=await fetch(url)
        let api=await response.json()
        console.log(api)
        setLogradouro(api.logradouro)
        setNumero(api.numero)
        setComplemento(api.complemento)
        setReferencia(api.ponto_de_referencia)
        if (api.endereco_casa==true){
            setTipo('Casa')
        }else if(api.endereco_trabalho==true){
            setTipo('Trabalho')
        }
    }

    useEffect(() => {
        busca();
        },[]);

    return(
        <>
        <Link to='/usuario'>
        <button>Voltar</button>
        </Link>
        <form onSubmit={salvar}>
            <label>Logradouro</label>
            <input type="text" name='logradouro' value={logradouro} onChange={changeLogradouro}/><br/>
            <label>Número</label>
            <input type="number" name="numero" value={numero} onChange={changeNumero}/><br/>
            <label>Complemento</label>
            <input type="text" name='complemento' value={complemento} onChange={changeComplemento}/><br/>
            <label>Ponto de Referência</label>
            <input type="text" name='referencia' value={referencia} onChange={changeReferencia}/><br/>
            <label>Tipo de Residência</label>
            <input type="text" name='tipo_res' value={tipo_res} onChange={changeTipo} placeholder="Casa ou Trabalho"/><br/>
            {/* ^ Mudar tipo_res para radio ou alguma coisa assim */}
			<br/><input type="submit" value="Atualizar"/>
        </form>
        </>
    )
}