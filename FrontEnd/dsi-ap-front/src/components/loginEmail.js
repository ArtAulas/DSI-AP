import React from 'react';
import emailjs from 'emailjs-com';

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CodigoContext } from '../context/CodigoContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function ValidarCodigo() {
	const{userId,ChangeUser}=useContext(UserContext)
	const{codigo,ChangeCodigo}=useContext(CodigoContext)
	const[codigoTeste,setCodigo]=useState(0)
	const setCodigoChange=(e)=>{
		setCodigo(e.target.value)
	}
	let navigate = useNavigate();

	let email= '';
	let nome='';

	const enviaEmail=()=>{
	let num=codigo

	var templateParams = {
		user_name:nome,
		user_email:email,
		message:num
	  };
	  
	emailjs.send('service_kgrhjxr', 'template_48e1k3a', templateParams,'JJm5KOCL3j8ImEgu5').then(
		(response) => {
			console.log('SUCCESS!', response.status, response.text);
		},
		(error) => {
			console.log('FAILED...', error);
		},
	);
	}

	const GetUserInfo=async()=>{
		let api = await fetch('http://127.0.0.1:8003/usuarios/buscar/id/'+userId)
		let data=await api.json()
		console.log('data', data)
		nome=data.nome;
		email=data.email;
		enviaEmail()
	  }
	
	  useEffect(() => {
		GetUserInfo();
		},[]);

	const confirmarCodigo=()=>{
		if (codigo==codigoTeste){
			alert('Código Válido')
			navigate('/paginainicial')
		}
		else{
			return alert('Codigo Incorreto')
		}
	}

	return (
		<form onSubmit={confirmarCodigo}>
			<label>Número:</label>
            <input type="number" name="codgioTeste" onChange={setCodigoChange}></input>
			<input type="submit" value="Confirmar"/>
		</form>
	);
}