import logo from '../logo.svg';
import '../App.css';
import { useState } from 'react';
//POST
export default function Logar() {
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
    setRetorno(data)
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
  }
  
  return (
    <div className="App">
      <div>

        Email: <input type='text' name='email' 
        value={email} onChange={setEmailChange} /><br/>

        Telefone: <input type='text' name='telefone' 
        value={telefone} onChange={setTelefoneChange} /><br/>

        <button onClick={logaremail}>Logar Com Email</button>
        <button onClick={logartelefone}>Logar Com Telefone</button>
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