import { Component, useContext } from "react"
import ComponentF from "./ComponentF"
import { Appcontext } from "../App"
function ComponentE(){
    const dispatchedContext = useContext(Appcontext)
        return(
            <>

        <div>Count  E - {dispatchedContext.countC}</div>
        <button onClick={()=>dispatchedContext.countDispatch('increment')}>Increment</button>
        <button onClick={()=>dispatchedContext.countDispatch('decrement')}>Decrement</button>
        <button onClick={()=>dispatchedContext.countDispatch('reset')}>Reset</button>
            </>
        )
    
}

export default ComponentE