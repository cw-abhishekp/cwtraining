// so here we are doing redux thing in order to mange the application
/// HERE WE ARE DOING WITH THE ONE REDUCER
console.log("Redux demo")

// so basically to combine the reducer we have something called as combine reducer provided by redux
const redux = require('redux')
const createStore = redux.createStore
// here we are combining the reducer and then passing the both the reducer as key value 
const combineReducer = redux.combineReducers


// logger for an application
const reduxlogger = require('redux-logger')
const logger = reduxlogger.createLogger()


const applymiddleware = redux.applyMiddleware

const BUY_CAKE ="BUY_CAKE"
function buyCake(){
    return{
        type : BUY_CAKE,
        infor : "First redux function"
    }
}

const BUY_ICECREAM ="BUY_ICECREAM"
function buyIcecream(){
    return{
        type : BUY_ICECREAM,
    }
}

const initialstatecake = {
    cakes : 10,
}


const initialstateicecream = {
    icecream : 20
}

const reducercake = (state = initialstatecake,action)=>{

    switch(action.type){
        case BUY_CAKE:
            return{
                ...state,
                cakes : state.cakes-1
            }
        default: return state
    }
}


const reducericecream = (state = initialstateicecream,action)=>{

    switch(action.type){
        case BUY_ICECREAM:
            return{
                ...state,
                icecream : state.icecream-1
            }
        default: return state
    }
}

// passing both the reducer as a key value pair in a combine reducer so that both works fine
// here both the reducer recieves tha action where as one acts on action whereas other one ignores that action
const reducer = combineReducer({
    cake : reducercake,
    icecream : reducericecream
})

 // holding the application state  
const store = createStore(reducer,applymiddleware(logger))

// getState method
console.log('Intial state',store.getState())

// we are getting the value unsubsribe and then doing all the function
const unsubscribe = store.subscribe(()=>{})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyCake())

unsubscribe()


// so b