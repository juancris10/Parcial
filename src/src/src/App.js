import logo from './logo.svg';
import './App.css';
import Show from './Components/Show';
import Editar from './Components/Editar';
import Crear from './Components/Crear';
import Entradas from './Components/Entradas';
import Salidas from './Components/Salidas';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import  ContextoProvider  from './Context/Contexto';

function App() {
  return (
    <div className="App">
      <>
        <ContextoProvider>
          <BrowserRouter>
          <Routes>
            <Route path= '/' element={ <Show/>}/>
            <Route path= '/crear' element={ <Crear/>}/>
            <Route path= '/editar/:id' element={ <Editar/>}/>
            <Route path= '/entradas' element={ <Entradas/>}/>
            <Route path= '/salidas' element={ <Salidas/>}/>
          </Routes>
          </BrowserRouter>
        </ContextoProvider>
      </>
    </div>
  );
}

export default App;
