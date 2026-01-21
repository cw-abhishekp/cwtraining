import { BUY_ICECREAM } from "./icecreamTypes"

const initialState = {
    numOfIceCream : 20
}

const icecreamReducer = (state = initialState,action)=>{
    switch(action.type){
        case BUY_ICECREAM:
            return{
                ...state,
                numOfIceCream : state.numOfIceCream-1
            }
        default: return state
    }
}

export default icecreamReducer