import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Usuario from './pages/Usuario';
import CadastroPage from './pages/Cadastro';
import AtualizaPage from './pages/Atualizar';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';
import ValidarCodigo from './components/loginEmail';
import { CodigoProvider } from './context/CodigoContext';
import { EnderecoProvider } from './context/EnderecoContext';
import CadastroEndereco from './components/cadastrarendereco';

function App() {
  return (
    <UserProvider>
      <EnderecoProvider>
      <CodigoProvider>
      <Router>
      <Routes>
        <Route path='/cadastroendereco' element={<CadastroEndereco/>}/>
        <Route path='/loginemail' element={<ValidarCodigo/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<CadastroPage/>}/>
        <Route path='/atualizar' element={<AtualizaPage/>}/>
        <Route path='/usuario' element={<Usuario/>}/>
      </Routes>
      </Router>
      </CodigoProvider>
      </EnderecoProvider>
    </UserProvider>
  );
}

export default App;