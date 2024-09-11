import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Usuario from './pages/Usuario';
import CadastroPage from './pages/Cadastro';
import AtualizaPage from './pages/Atualizar';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';
import Contact from './components/loginEmail';
import { CodigoProvider } from './context/CodigoContext';

function App() {
  return (
    <UserProvider>
      <CodigoProvider>
      <Router>
      <Routes>
        <Route path='/loginemail' element={<Contact/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<CadastroPage/>}/>
        <Route path='/atualizar' element={<AtualizaPage/>}/>
        <Route path='/usuario' element={<Usuario/>}/>
      </Routes>
      </Router>
      </CodigoProvider>
    </UserProvider>
  );
}

export default App;