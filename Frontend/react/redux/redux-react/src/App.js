import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux'
import CakeContainer from './component/CakeContainer';
import Store from './redux/Store';
import HooksCakeContainer from './component/HooksCakeContainer';
import IcecreamContainer from './component/IcecreamContainer';
import NewCakeContainer from './component/NewCakeContainer';
import ItemContainer from './component/ItemContainer';

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
      <ItemContainer cake/>
      <ItemContainer/>
      <CakeContainer/>
      <IcecreamContainer/>
      <NewCakeContainer/>
      {/* <HooksCakeContainer/> */}
    </div>
    </Provider>
  ); 
}

export default App;
