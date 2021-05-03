import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Prueba from './componentes/prueba.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        /*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Prueba />
      </header> */}
       <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        <h2 id="subtitulo">En esta plataforma encontraras videos en formatos unicos</h2>

        <div id="botones">
          <button className="botones"><Link className="textobotones" to={{ pathname: "/videos", state: '21:9' }} >21:9</Link></button>
          <button className="botones"><Link className="textobotones" to={{ pathname: "/videos", state: '1440' }} >1440</Link></button>
          <button className="botones"><Link className="textobotones" to={{ pathname: "/videos", state: '4k' }} >4K</Link></button>      
        </div>
      </div>
  
    </div>
  );
}

export default App;
