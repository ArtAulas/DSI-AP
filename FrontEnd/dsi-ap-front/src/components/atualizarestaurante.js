import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AtualizaRestaurante(){
    let navigate=useNavigate()
    const[nome, setNome]=useState('')
    const nomeChange=(e)=>{
        setNome(e.target.value)
    }

    const[telefone,setTelefone]=useState(0)
    const telefoneChange=(e)=>{
        setTelefone(e.target.value)
    }

    const[email,setEmail]=useState('')
    const emailChange=(e)=>{
        setEmail(e.target.value)
    }

    const[cep,setCep]=useState(0)
    const cepChange=(e)=>{
        setCep(e.target.value)
    }

    const[estado,setEstado]=useState('')
    const estadoChange=(e)=>{
        setEstado(e.target.value)
    }

    const[cidade,setCidade]=useState('')
    const cidadeChange=(e)=>{
        setCidade(e.target.value)
    }

    const[cnpj,setCnpj]=useState(0)
    const cnpjChange=(e)=>{
        setCnpj(e.target.value)
    }

    const[especialidade,setEspecialidade]=useState('')
    const especialidadeChange=(e)=>{
        setEspecialidade(e.target.value)
    }

    const[razao,setRazao]=useState('')
    const razaoChange=(e)=>{
        setRazao(e.target.value)
    }

    const[plano,setPlano]=useState('')
    const planoChange=(e)=>{
        setPlano(e.target.value)
    }

    const[id,setID]=useState(0)
    const idChange=(e)=>{
        setID(e.target.value)
    }

    const salvar=async(e)=>{
        e.preventDefault()

        let plano_temp=plano.toLowerCase()
        plano_temp=plano_temp.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let basico=false
        let entrega=false
        if (plano_temp=='basico'){
            basico=true
        }else if(plano_temp=='entrega'){
            entrega=true
        }else{
            return alert('Escolha um Plano para o restaurante')
        }

        let url='http://127.0.0.1:8003/restaurantes/atualizar/'+id
        let api=await fetch(url,{
            method:'PUT',
            headers:{
                 "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "nome_restaurante": nome,
                "telefone_restaurante": telefone,
                "email_restaurante": email,
                "cep_restaurante": cep,
                "estado_restaurante": estado,
                "cidade_restaurante": cidade,
                "cnpj_restaurante": cnpj,
                "especialidade_restaurante": especialidade,
                "razao_social_restaurante": razao,
                "plano_basico_restaurante": basico,
                "plano_entrega_restaurante": entrega
              })
        })
        if (api.ok){
            alert('Atualização Ok')
        }else{
            return alert('Erro ao Atualizar')
        }
        navigate('/restaurante')
    }

    return(
        <>
        <h1>Atualização de Restaurante</h1>
        <form onSubmit={salvar}>
        <label>ID</label>
        <input type="number" name='id' value={id} onChange={idChange}></input><br/>
        <label>Nome Restaurante</label>
        <input type="text" name="nome" value={nome} onChange={nomeChange}/><br/>
        <label>Telefone</label>
        <input type="number" name="telefone" value={telefone} onChange={telefoneChange}/><br/>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={emailChange}/><br/>
        <label>CEP</label>
        <input type="number" name="cep" value={cep} onChange={cepChange}/><br/>
        <label>Estado</label>
        <input type="text" name="estado" value={estado} onChange={estadoChange}/><br/>
        <label>Cidade</label>
        <input type="text" name="cidade" value={cidade} onChange={cidadeChange}/><br/>
        <label>CNPJ</label>
        <input type="number" name="cnpj" value={cnpj} onChange={cnpjChange}/><br/>
        <label>Especialidade</label>
        <input type="text" name="especialidade" value={especialidade} onChange={especialidadeChange}/><br/>
        <label>Razão Social</label>
        <input type="text" name="razao" value={razao} onChange={razaoChange}/><br/>
        <label>Tipo de Plano</label>
        <input type="text" placeholder="Entrega ou Básico" name="plano" value={plano} onChange={planoChange}/><br/>
        <input type="submit" value="Atualizar"/>
    </form>
    </>
    )
}