import { useEffect, useReducer } from "react"
import axios from 'axios'

const initialState = {
    loading : true,
    error : '',
    posts : {}
}

const reducer = (state,action) =>{
    switch(action.type){
        case 'FETCH-SUCCESS':
            return {
                loading : false,
                error : '',
                posts : action.payload
            }
        case 'FETCH-ERROR':
            return {
                loading : false,
                error : 'Something went wrong!',
                posts : {}
            }
        default:
            return state
    }
}
function FetchUseReducer(){
    // dispatch is used to call the function reducer or specify the action like here increment decrement or somehthing like this
    const [state,dispatch] = useReducer(reducer,initialState);

    useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/posts/1")
    .then((res)=>{
        dispatch({type: 'FETCH-SUCCESS', payload:res.data})
    })
    .catch((err)=>{
        dispatch({type: 'FETCH-ERROR'})
    })
    },[])
    return (
        <>
        {state.loading ? 'Loading' : state.posts.title}
        {state.error ? state.error : null}
        </>
    )
}

export default  FetchUseReducer
