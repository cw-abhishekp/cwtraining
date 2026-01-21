const redux = require('redux')
const { createStore, applyMiddleware } = redux
const thunkMiddleware = require('redux-thunk').thunk
const axios = require('axios')


const initialState = {
    loading : false,
    users : [],
    error : ''
}

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

function fetchUsersRequest(){
    return{
        type : FETCH_USERS_REQUEST
    }
}

function fetchUsersSuccess(users){
    return{
        type : FETCH_USERS_SUCCESS,
        payload : users
    }
}

function fetchUsersFailure(error){
    return{
        type : FETCH_USERS_FAILURE,
        payload : error
    }
}


const reducer = (state = initialState,action) =>{
    switch(action.type){
        case FETCH_USERS_REQUEST: return{
            ...state,
            loading :true
        }

        case FETCH_USERS_SUCCESS: return{
            ...state,
            loading :false,
            error : '',
            users : action.payload
        }

        case FETCH_USERS_FAILURE: return{
            ...state,
            loading :false,
            error : action.payload,
            users : []
        }
        default: return state
    }
}



const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            const users = response.data.map(user =>user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch((error)=>{
            dispatch(fetchUsersFailure(error.message))
        })
    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware))

const unsubscribe = store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())


