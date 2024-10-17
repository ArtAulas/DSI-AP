import { useState,useEffect } from "react"
import { Link } from "react-router-dom"

export default function ListaProdutos(){
    const[retorno,setRetorno]=useState([])
    const[id,setId]=useState(0)
    const idChange=(e)=>{
        setId(e.target.value)
    }

    const busca=async()=>{
        let url='http://127.0.0.1:8003/produtos/buscar'
        let response=await fetch(url)
        let lista=await response.json()
        setRetorno(lista)
    }

    const buscaid=async()=>{
        let url='http://127.0.0.1:8003/produtos/buscar/id_restaurante/'+id
        let response=await fetch(url)
        let lista=await response.json()
        setRetorno(lista)
    }

    useEffect(()=>{
        busca();
    },[])

    return(
        <>
        <Link to='/restaurante'>
            <button>Voltar</button>
        </Link><br/>
        <label>Insira o ID do restaurante</label>
        <input type="number" value={id} onChange={idChange}></input>
        <button onClick={buscaid}>Busca por ID</button>
        <div id="lista">
        {retorno.map(item=>{
            return(
                <ul key={item.id}>
                    <li key={item.id+'id'}>ID: {item.id_produto}</li>
                    <li key={item.id+'nome'}>Nome: {item.nome_produto}</li>
                    <li key={item.id+'descricao'}>Descrição: {item.descricao_produto}</li>
                    <li key={item.id+'categoria'}>Categoria: {item.categoria_produto}</li>
                    <li key={item.id+'preco'}>Preço: {item.preco_produto}</li>
                    <li key={item.id+'restaurante'}>Restaurante: {item.id_restaurante}</li>
                    {item.denunciar_produto 
                    ? (<li key={item.id+'denuncia'}>Produto foi denunciado</li>)
                    :(<></>)}
                </ul>
            )
        })}</div>
        </>
    )
}