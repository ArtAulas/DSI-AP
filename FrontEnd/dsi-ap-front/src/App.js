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
import { IdRestProvider } from './context/IdRestauranteContext';
import { IdPedidoProvider } from './context/IdPedidoContext';
import CadastroEndereco from './components/endereco/cadastrarendereco';
import CadastroRestaurante from './components/restaurantes/cadastrorestaurante';
import RestauranteOpcoesPage from './pages/PaginaOpcoesRestaurante';
import LoginGoogle from './components/logingoogle';
import ListaRestaurante from './components/restaurantes/listagemrestaurante';
import AtualizaRestaurante from './components/restaurantes/atualizarestaurante';
import DeletaRestaurante from './components/restaurantes/deletarestaurante';
import AtualizaEndereco from './components/endereco/atualizaendereco';
import PaginaInicial from './pages/PaginaInicial';
import ListaProdutos from './components/produtos/listaprodutos';
import CadastroProdutos from './components/produtos/cadastroprodutos';
import DeletaProduto from './components/produtos/deletarproduto';
import AtualizarProdutos from './components/produtos/atualizaproduto';
import PaginaRestaurante from './pages/PaginaRestaurante';
import PedidoPage from './pages/Pedido';

function App() {
  return (
    <UserProvider>
    <EnderecoProvider>
    <CodigoProvider>
    <IdRestProvider>
    <IdPedidoProvider>
      <Router>
        <Routes>
          <Route path='/pedido' element={<PedidoPage/>}/>
          <Route path='/pagina_restaurante' element={<PaginaRestaurante/>}/>
          <Route path='/atualizaproduto' element={<AtualizarProdutos/>}/>
          <Route path='/deletarproduto' element={<DeletaProduto/>}/>
          <Route path='/cadastroproduto' element={<CadastroProdutos/>}/>
          <Route path='/listaprodutos' element={<ListaProdutos/>}/>
          <Route path='/paginainicial' element={<PaginaInicial/>}/>
          <Route path='/atualizaendereco' element={<AtualizaEndereco/>}/>
          <Route path='/deletarestaurante' element={<DeletaRestaurante/>}/>
          <Route path='/atualizarestaurante' element={<AtualizaRestaurante/>}/>
          <Route path='/listarestaurante' element={<ListaRestaurante/>}/>
          <Route path='/restaurante' element={<RestauranteOpcoesPage/>}/>
          <Route path='/cadastrorestaurante' element={<CadastroRestaurante/>}/>
          <Route path='/cadastroendereco' element={<CadastroEndereco/>}/>
          <Route path='/loginemail' element={<ValidarCodigo/>}/>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cadastro' element={<CadastroPage/>}/>
          <Route path='/atualizar' element={<AtualizaPage/>}/>
          <Route path='/usuario' element={<Usuario/>}/>
          <Route path='/logingoogle' element={<LoginGoogle/>}/>
        </Routes>
      </Router>
    </IdPedidoProvider>
    </IdRestProvider>
    </CodigoProvider>
    </EnderecoProvider>
    </UserProvider>
  );
}

export default App;