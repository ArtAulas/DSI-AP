import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"

export default function AtualizarProdutos(){
    let navigate=useNavigate()

    const[nome,setNome]=useState('')
    const nomeChange=(e)=>{
        setNome(e.target.value)
    }

    const[desc,setDesc]=useState('')
    const descChange=(e)=>{
        setDesc(e.target.value)
    }

    const[categoria,setCat]=useState('')
    const catChange=(e)=>{
        setCat(e.target.value)
    }

    const[preco,setPreco]=useState('')
    const precoChange=(e)=>{
        setPreco(e.target.value)
    }

    const[resta,setResta]=useState(0)
    const restaChange=(e)=>{
        setResta(e.target.value)
    }

    const[id,setID]=useState(0)
    const idChange=(e)=>{
        setID(e.target.value)
    }

    const salvar=async(e)=>{
        e.preventDefault()

        let url='http://127.0.0.1:8003/produtos/atualizar/'+id
        let api=await fetch(url,{
            method:'PUT',
            headers:{
                 "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "nome_produto": nome,
                "categoria_produto": categoria,
                "descricao_produto": desc,
                "preco_produto": preco,
                "denunciar_produto": false,
                "id_restaurante": resta
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
    <Link to='/restaurante'>
        <button>Voltar</button>
    </Link>
    <h1>Cadastro de Produto</h1>
    <form onSubmit={salvar}>
        <label>ID</label>
        <input type="number" name='id' value={id} onChange={idChange}></input><br/>
        <label>Nome do Produto</label>
        <input type="text" name="nome" value={nome} onChange={nomeChange}/>
        <br/>
        <label>Descrição do Produto</label>
        <input type="text" name="desc" value={desc} onChange={descChange}/>
        <br/>
        <label>Categoria do Produto</label>
        <input type="text" name="categoria" value={categoria} onChange={catChange}/>
        <br/>
        <label>Preço do Produto</label>
        <input type="number" name="preco" value={preco} step=".01" onChange={precoChange}/>
        <br/>
        <label>Id do Restaurante</label>
        <input type='number' name='id_restaurante' value={resta} onChange={restaChange}/>
        <br/>
        <input type="submit" value='Atualizar'/>
    </form>
    </>)
}