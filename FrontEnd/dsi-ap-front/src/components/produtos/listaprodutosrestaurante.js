import { useContext,useEffect,useState } from "react"
import { IdRestContext } from "../../context/IdRestauranteContext"

export default function ListaProdutosRestaurante(){
    const{restId}=useContext(IdRestContext)
    const [retorno, setRetorno]=useState([])


    const busca=async()=>{
        let url='http://127.0.0.1:8003/produtos/buscar/id_restaurante/'+restId
        let api=await fetch(url)
        let data=await api.json()
        setRetorno(data)
    }

    useEffect(() => {
        busca();
        },[]);

    return(
        <div className="lista_produtos">
        {retorno.map(item=>{
            return(
                <ul key={item.id}>
                    <li key={item.id+'nome'}>Nome: {item.nome_produto}</li>
                    <li key={item.id+'descricao'}>Descrição: {item.descricao_produto}</li>
                    <li key={item.id+'categoria'}>Categoria: {item.categoria_produto}</li>
                    <li key={item.id+'preco'}>Preço: {item.preco_produto}</li>
                    {item.denunciar_produto 
                    ? (<li key={item.id+'denuncia'}>Produto foi denunciado</li>)
                    :(<></>)}
                    {/* <button>Adicionar ao Pedido</button> */}
                </ul>
            )
        })}
        </div>
    )
}