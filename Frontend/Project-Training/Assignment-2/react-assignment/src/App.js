import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import { Provider } from 'react-redux';
import Store from '../src/store/Store';
import Home from './components/Home';
function App() {
  return (
    <Provider store ={Store}>
    <div className="App">
     <Home/>
    </div>
    </Provider>
  );
}

export default App;
