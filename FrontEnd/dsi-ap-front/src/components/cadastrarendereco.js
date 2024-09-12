import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function CadastroEndereco(){
    let navigate=useNavigate()
	const{userId,ChangeUser}=useContext(UserContext)

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
        tipo_res=tipo_res.toLowerCase

        if (tipo_res=='casa'){
            casa=true
            console.log(casa,trabalho)
        }else if(tipo_res=='trabalho'){
            trabalho=true
            console.log(casa,trabalho)
        }else if(tipo_res==''){
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
            alert("Cadastro ok")
            navigate('/usuario')
          }else{
            return alert("Erro ao cadastrar")
          }
    }

    return(
        <form onSubmit={salvar}>
            <label>Logradouro</label>
            <input type="text" name='logradouro' value={logradouro} onChange={changeLogradouro}></input>
            <label>Número</label>
            <input type="number" name="numero" value={numero} onChange={changeNumero}></input>
            <label>Complemento</label>
            <input type="text" name='complemento' value={complemento} onChange={changeComplemento}></input>
            <label>Ponto de Referência</label>
            <input type="text" name='referencia' value={referencia} onChange={changeReferencia}></input>
            <label>Tipo de Residência</label>
            <input type="text" name='tipo_res' value={tipo_res} onChange={changeTipo} placeholder="Casa ou Trabalho"></input>
            {/* ^ Mudar tipo_res para radio ou alguma coisa assim */}
			<input type="submit" value="Cadastrar"/>
        </form>
    )
}