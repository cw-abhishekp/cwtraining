import { useState } from 'react'
import './App.css'

function App() {
// so here we are using the hooks useState to propagate the change of the variables to the UI
  const [counter, setCounter] = useState(0)
  function increaseCounter(){
    setCounter(counter+1)
    console.log("Counter Value Increased : " + counter);
  }

   function decreaseCounter(){
    setCounter(counter-1)
    console.log("Counter Value Decreased : " + counter);    
  }
  
  return (
    <>
    <h1>Learning the Hooks</h1>
    <p>Counter Value : {counter}</p>
    <button onClick={increaseCounter}>Increase Counter</button>
    <br></br>
    <button onClick={decreaseCounter}>Decrease Counter</button>
    </>
  )
}

export default App
