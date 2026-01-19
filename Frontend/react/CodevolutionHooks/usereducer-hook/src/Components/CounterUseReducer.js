import { useReducer } from "react"

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

function CounterUseReducer(){
    // dispatch is used to call the function reducer or specify the action like here increment decrement or somehthing like this
    const [count,dispatch] = useReducer(reducer,initialState);
    return (
        <>
        <div>Count - {count}</div>
        <button onClick={()=>dispatch('increment')}>Increment</button>
        <button onClick={()=>dispatch('decrement')}>Decrement</button>
        <button onClick={()=>dispatch('reset')}>Reset</button>
        </>
    )
}

export default CounterUseReducer