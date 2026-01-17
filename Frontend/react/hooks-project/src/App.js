import { useState, useCallback, useEffect, useRef } from "react";


function App() {

const [length,setLength] = useState(8);
const [numberAllowed,setNumberAllowed] = useState(false);
const [charAllowed,setCharAllowed] = useState(false);
const  [password,setPassword] = useState("");

const passRef = useRef(null);

const passwordGenerator = useCallback(()=>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numberAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%^&*()_+?><:"

  for(let i =1;i<=length;i++){
  const index = Math.floor(Math.random() * str.length +1);
  pass+=str.charAt(index);
  }

  setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])


const copyValueFromClipBoard = useCallback(()=>{
  passRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

// here also we are using another hook useffect to call the function and then using that we can call 
// here also two things one is function and then another is dependencies 


// usecallback me aisa karna hai jo jo dependencies hai us method ko optimise karke kahi cache karlo jisse easy hoga aur useEffect matlab dubra se run kardo agar inme kisi me change ho raha hai to

useEffect(()=>{
  passwordGenerator();
},[length,numberAllowed,charAllowed,passwordGenerator])
// we can directly call this since react manages when to call and all these
// passwordGenerator()

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <hr></hr>
      <input type = "text" value={password} placeholder="Enter the passwod"  ref={passRef} readOnly/>
      <hr></hr>
      <button onClick={copyValueFromClipBoard}>Copy</button>
      <hr></hr>
      <div>
        <input type ="range" value={length} min={6} max={100} onChange={(e)=>setLength(e.target.value)}/>
        <label>Length : {length}</label>
        </div>

        <hr></hr>
        <div>
      <input type ="checkbox" defaultChecked={numberAllowed} onChange={()=>setNumberAllowed((prev) => !prev)}/>
      <label>Number</label>
      </div>
      <div>
      <input type ="checkbox" defaultChecked={charAllowed} onChange={()=>setCharAllowed((prev) => !prev)}/>
      <label>Character</label>
      </div>
    </div>
  );
}

export default App;
