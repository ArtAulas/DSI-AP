import logo from '../logo.svg';
import { Link } from "react-router-dom"
import '../App.css';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
//POST
export default function Logar() {
  const{userId,ChangeUser}=useContext(UserContext)

  const [retorno, setRetorno]=useState([])
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  

  const setEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const setTelefoneChange = (e) => {
    setTelefone(e.target.value);
  }

  const logaremail= async()=>{
    let url='http://127.0.0.1:8003/usuarios/buscar/email/' + email
    let api = await fetch(url)
    console.log(url)
    let data = await api.json();
    console.log(data)
    if (api.status===404){
        setRetorno([])
        return alert('Usuario não encontrado')
    }
    setRetorno(data);
    ChangeUser(data.id)
  }

  const logartelefone= async()=>{
    let api = await fetch('http://127.0.0.1:8003/usuarios/buscar/telefone/'+telefone)
    
    let data = await api.json();
    console.log(data)
    if (api.status===404){
        setRetorno([])
        return alert('ID não encontrado')
    }
    setRetorno(data)
    ChangeUser(data.id)
  }
  
  return (
    <div className="App">
      <p>o Usuário atual é {userId}</p>
      <div>

        Email: <input type='text' name='email' 
        value={email} onChange={setEmailChange} /><br/>

        Telefone: <input type='text' name='telefone' 
        value={telefone} onChange={setTelefoneChange} /><br/>

        <button onClick={logaremail}>Logar Com Email</button>
        <button onClick={logartelefone}>Logar Com Telefone</button>
        <Link to="/usuario">
        <button>Exibir Info</button>
        </Link>
        <ul>
                <li>Nome:{retorno.nome}  {retorno.sobrenome}</li>
                <li>Email:{retorno.email}</li>
                <li>Telefone:{retorno.telefone}</li>
                <li>CPF:{retorno.cpf}</li>
        </ul>
      </div>
    </div>
  );
}