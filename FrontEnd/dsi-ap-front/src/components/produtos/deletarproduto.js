import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"

export default function DeletaProduto(){
    let navigate=useNavigate()

    const[id,setID]=useState(0)
    const idChange=(e)=>{
        setID(e.target.value)
    }

    const ConfirmDeletar=(e)=>{
        e.preventDefault()
        let text = "Confirma a Deleção?";
        if(window.confirm(text)===true){
            Deletar()
        }else{
            alert('Você Cancelou a Deleção')
        }
    }
    
    const Deletar=async()=>{
        let api = await fetch('http://127.0.0.1:8003/produtos/apagar/'+id,{
            method:"DELETE",
            headers:{
              "Content-Type": "application/json"
            },
          })
          alert('Produto Deletado')
          navigate('/restaurante')
    }

    return(
        <>
        <Link to='/restaurante'>
        <button>Voltar</button>
        </Link>
        <h1>Remoção de Produto</h1>
        <form onSubmit={ConfirmDeletar}>
        <label>Insira o ID do produto</label>
        <input type="number" value={id} onChange={idChange}></input>
        <input type="submit" value="Deletar"/>
        </form>
        </>
    )
}