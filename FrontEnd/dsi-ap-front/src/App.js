import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Usuario from './pages/Usuario';
import CadastroPage from './pages/Cadastro';
import AtualizaPage from './pages/Atualizar';
import Atualiza from './components/atualiza';
import Logar from './components/logar';
import { Layout } from './layout';
import { useState } from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Logar/>}/>
        <Route path='/cadastro' element={<CadastroPage/>}/>
        <Route path='/usuario' element={<Usuario/>}/>
        <Route path='/atualizar' element={<AtualizaPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;