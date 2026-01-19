import logo from './logo.svg';
import './App.css';
import CounterUseReducer from './Components/CounterUseReducer';
import CounterObject from './Components/CounterObject';
import React, { useReducer } from 'react';
import ComponentD from './Components/ComponentD';
import ComponentE from './Components/ComponentE';
import ComponentF from './Components/ComponentF';
import FetchUseReducer from './Components/FetchUseReducer';


const initialState = 0;

const reducer = (state,action) =>{
    switch(action){
        case 'increment':
            return state+1
        case 'decrement':
            return state-1
        case 'reset':
            return 0
        default:
            return state
    }
}

const Appcontext = React.createContext()

function App() {
  const [count,dispatch] = useReducer(reducer,initialState);
  return (
    <div className="App">
      {/* <CounterUseReducer/> */}
      {/* <CounterObject/> */}

      {/* Count - {count}
      <Appcontext.Provider value = {{countC :count, countDispatch : dispatch}}>
      <ComponentD/>
      <ComponentE/>
      <ComponentF/>
      </Appcontext.Provider> */}


      <FetchUseReducer/>

    </div>
  );
}

export default App;
export {Appcontext}