import logo from '../../logo.svg';
import { Link } from "react-router-dom"
import '../../App.css';
import { useState,useContext,useEffect } from 'react';
import { googleLogout, useGoogleLogin} from '@react-oauth/google';
import { UserContext } from '../../context/UserContext';
import { CodigoContext } from '../../context/CodigoContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//POST
export default function Logar() {
  const{userId,ChangeUser}=useContext(UserContext)
  const{codigo,ChangeCodigo}=useContext(CodigoContext)
  let navigate = useNavigate();

  const [retorno, setRetorno]=useState([])
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ user, setUser ] = useState([]);

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
    let num=Math.floor(Math.random()*1000000)
	  console.log(num)
    ChangeCodigo(num)
    return navigate("/loginemail")
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
    return navigate("/usuario")
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
                      setEmail(res.data.email)
                      googleLogout();
                      logaremail()
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );
  
  return (
    <div className="App">
      <div>

        Email: <input type='text' name='email' 
        value={email} onChange={setEmailChange} /><br/>

        Telefone: <input type='text' name='telefone' 
        value={telefone} onChange={setTelefoneChange} /><br/>

        <button onClick={logaremail}>Logar Com Email</button>
        <button onClick={logartelefone}>Logar Com Telefone</button>
        <button onClick={() => login()}>Logar com Google</button>
      </div>
    </div>
  );
}