import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Equipamentos from './pages/equipamentos/Equipamentos';
import Cadastro from './pages/cadastro/Cadastro';
import Interno from './pages/interno/Interno';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/cadastro' element={ <Cadastro /> } />
        <Route path='/equipamentos' element={ <Equipamentos /> } />
        <Route path='/interno' element={ <Interno /> } />
      </Routes>
    </div>
  );
}

export default App;
