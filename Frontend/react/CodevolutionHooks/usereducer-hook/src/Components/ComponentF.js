import { Component, useContext } from "react"
import { Appcontext } from "../App"

function ComponentF(){
        const dispatchedContext = useContext(Appcontext)

        return(
            <>

        <div>Count  F - {dispatchedContext.countC}</div>
        <button onClick={()=>dispatchedContext.countDispatch('increment')}>Increment</button>
        <button onClick={()=>dispatchedContext.countDispatch('decrement')}>Decrement</button>
        <button onClick={()=>dispatchedContext.countDispatch('reset')}>Reset</button>
            </>
        )
}

export default ComponentF