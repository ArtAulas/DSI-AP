import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Usuario from './pages/Usuario';
import CadastroPage from './pages/Cadastro';
import AtualizaPage from './pages/Atualizar';
import Logar from './components/logar';
import { Layout } from './layout';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
      <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Logar/>}/>
        <Route path='/cadastro' element={<CadastroPage/>}/>
        <Route path='/atualizar' element={<AtualizaPage/>}/>
        </Route>
        
        <Route path='/usuario' element={<Usuario/>}/>
      </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;