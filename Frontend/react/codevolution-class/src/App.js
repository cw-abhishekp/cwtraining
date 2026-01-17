import { useState } from "react";
import Welcome from "./component/Welcome";
import Message from "./component/Message";
import Counter from "./component/Counter";
import ConditionalRendering from "./component/ConditionalRendering";

function App() {
  // const [thankyou,setThankYou] = useState("Welcome home")

  return (
    
    <div className="App">
      {/* // here we have learned how the class component props works */}
      {/* <Welcome name = "Abhi" cricketerName = "Virat">
        <p1>This is the favourite cricketer</p1>
      </Welcome>
      <Welcome name = "Harsh" cricketerName = "Rohit"/>
      <Welcome name = "Abhishek" cricketerName = "MS"/> */}

      {/* // this we have done using the functional component */}
      {/* <h1>{thankyou}</h1>
      <hr></hr>
      <button onClick={()=>setThankYou("Thankyou for coming!")}>Click to change the content</button> */}


      {/* Class Based State */}
      {/* <Message/> */}
      {/* <Message/> */}

      <ConditionalRendering/>
    </div>
  );
}  


 

export default App;
