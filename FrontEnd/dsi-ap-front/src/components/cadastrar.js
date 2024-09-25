import logo from '../logo.svg';
import '../App.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';

//POST
export default function Cadastro() {
  let navigate = useNavigate();
  const [ user, setUser ] = useState([]);

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
    if(telefone==''){
      return alert('Informe um Telefone')
    }

    let api = await fetch('http://127.0.0.1:8003/usuarios/inserir',{
      method:"POST",
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
      alert("Cadastro ok")
      return navigate('/login')
    }else{
      return alert("Erro ao cadastrar")
    }
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setNome(res.data.given_name)
                      setSobrenome(res.data.family_name)
                      setEmail(res.data.email)
                      googleLogout();
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );
  
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
      <button onClick={() => login()}>Logar com Google</button>
    </div>
  );
}