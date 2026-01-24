import './App.css';
import Card from './components/Card';
import { Provider } from 'react-redux';
import Store from '../src/store/Store';
import Home from './components/Home';
import Header from './components/Header';
function App() {
  return (
    <div>
      <Header />
      <Provider store ={Store}>
        <div className="App">
        <Home/>
        </div>
      </Provider>
    </div>
  );
}

export default App;
