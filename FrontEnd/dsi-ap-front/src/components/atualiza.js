import logo from '../logo.svg';
import '../App.css';
import { useState } from 'react';
//POST
export default function Atualiza(id) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf,setCPF]=useState('')

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

  const salvar= async()=>{
    let api = await fetch('http://127.0.0.1:8003/usuarios/atualizar' + id,{
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
        "anuncios":false
      })
    })
    
    let data = await api.json();
    console.log(data)
    if(api.ok){
      return alert("Cadastro ok")
    }else{
      return alert("Erro ao cadastrar")
    }
  }
  
  return (
    <div className="App">
      <div>
        Nome: <input type='text' name='nome' 
        value={nome} onChange={setNomeChange} /><br/>

        Sobrenome: <input type='text' name='sobrenome' 
        value={sobrenome} onChange={setSobrenomeChange} /><br/>

        Email: <input type='text' name='email' 
        value={email} onChange={setEmailChange} /><br/>

        Telefone: <input type='text' name='telefone' 
        value={telefone} onChange={setTelefoneChange} /><br/>

        CPF: <input type='text' name='cpf' 
        value={cpf} onChange={setCPFChange} placeholder='XXX.XXX.XXX-XX'/><br/>

        <button onClick={salvar}>Cadastrar</button>
      </div>
    </div>
  );
}