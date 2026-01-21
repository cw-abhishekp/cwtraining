// so here we are doing redux thing in order to mange the application
/// HERE WE ARE DOING WITH THE ONE REDUCER
console.log("Redux demo")

const redux = require('redux')
const createStore = redux.createStore

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

const initialstate = {
    cakes : 10,
    icecream : 20
}


const reducer = (state = initialstate,action)=>{

    switch(action.type){
        case BUY_CAKE:
            return{
                ...state,
                cakes : state.cakes-1
            }
        
        case BUY_ICECREAM:
            return{
                ...state,
                icecream : state.icecream-1
            }

        default: return state
    }
}

 // holding the application state  
const store = createStore(reducer)

// getState method
console.log('Intial state',store.getState())

// we are getting the value unsubsribe and then doing all the function
const unsubscribe = store.subscribe(()=>{console.log('Updated state', store.getState())})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyCake())

unsubscribe()


