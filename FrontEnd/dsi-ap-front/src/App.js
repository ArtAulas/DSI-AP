import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Usuario from './pages/Usuario';
import CadastroPage from './pages/Cadastro';
import Atualiza from './components/atualiza';
import AtualizaPage from './pages/Atualizar';
import Login from './pages/Login';
import { Layout } from './layout';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
      <Routes>
        
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<CadastroPage/>}/>
        <Route path='/atualizar' element={<Atualiza/>}/>
        <Route path='/usuario' element={<Usuario/>}/>
      </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;