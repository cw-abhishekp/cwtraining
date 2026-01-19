import logo from './logo.svg';
import './App.css';
import ButtonCounter from './hoc-component/ButtonCounter';
import HoverCounter from './hoc-component/HoverCounter';
import RenderProps from './render-props/RenderProps';
import Counter from './render-props/Counter';

function App() {
  return (
    <div className="App">
     {/* <ButtonCoounter name ="Harsh"/>
     <hr></hr>
     <HoverCounter/>
     <hr></hr>
     <hr></hr> */}
     {/* <RenderProps render = {(isLoggedIn) => isLoggedIn ? "Abhishek" : "Guest" }/> */}


      <Counter  render={(count,incrementCounter)=>(
        <ButtonCounter count ={count} incrementCounter={incrementCounter}/>
  )}/>

      <Counter  render={(count,incrementCounter)=>(
        <HoverCounter count ={count} incrementCounter={incrementCounter}/>
  )}/>
    </div>
    
  );
}

export default App;
