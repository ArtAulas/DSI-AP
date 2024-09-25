import { UserContext } from "../context/UserContext";
import { useState,useContext,useEffect } from "react"
import { useNavigate,Link } from "react-router-dom";
//POST
export default function Atualiza() {
  const {userId}=useContext(UserContext)
  let navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf,setCPF]=useState('')
  const [anuncios,setAnuncios]=useState('')

  const GetUserInfo=async()=>{
    let api = await fetch('http://127.0.0.1:8003/usuarios/buscar/id/'+userId)
    let data=await api.json()
    console.log('data', data)
    setNome(data.nome)
    setSobrenome(data.sobrenome)
    setEmail(data.email)
    setTelefone(data.telefone)
    setCPF(data.cpf)
    setAnuncios(String(data.anuncios))
  }

  useEffect(() => {

    GetUserInfo();
    
    },[]);

  const setNomeChange = (e) => {
    setNome(e.target.value);
  }

  const setSobrenomeChange = (e) => {
    setSobrenome(e.target.value);
  }

  const setEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const setTelefoneChange = (e) => {
    setTelefone(e.target.value);
  }

  const setCPFChange=(e)=>{
    setCPF(e.target.value)
  }

  const setAnunciosChange=(e)=>{
    setAnuncios(e.target.value)
  }

  const salvar= async()=>{
    let api = await fetch('http://127.0.0.1:8003/usuarios/atualizar/'+userId,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "nome": nome,
        "sobrenome":sobrenome,
        "email": email,
        "telefone": telefone,
        "cpf":cpf,
        "anuncios":anuncios
      })
    })
    
    let data = await api.json();
    console.log(data)
    if(api.ok){
      alert("Atualização ok")
      navigate('/usuario')
      return
    }else{
      return alert("Erro ao atualizar")
    }
  }
  
  return (
    <div className="App">
      <Link to='/usuario'>
        <button>Voltar</button>
      </Link>
      <div>
        Nome: <input type='text' name='nome' 
        value={nome} onChange={setNomeChange} /><br/>

        Sobrenome: <input type='text' name='sobrenome' 
        value={sobrenome} onChange={setSobrenomeChange} /><br/>

        Email: <input type='email' name='email' 
        value={email} onChange={setEmailChange} /><br/>

        Telefone: <input type='text' name='telefone' 
        value={telefone} onChange={setTelefoneChange} /><br/>

        CPF: <input type='text' name='cpf' 
        value={cpf} onChange={setCPFChange} placeholder='XXX.XXX.XXX-XX'/><br/>

        Permitir anuncios de terceiros: 
        <input type="radio" name="anuncios" value='true' checked={anuncios ==='true'} onChange={setAnunciosChange}/>
        <label>Permitir</label>
        <input type="radio" name="anuncios" value="false" checked={anuncios ==='false'} onChange={setAnunciosChange}/>
        <label>Não Permitir</label>
        <br/>
        <button onClick={salvar}>Atualizar</button>
      </div>
    </div>
  );
}