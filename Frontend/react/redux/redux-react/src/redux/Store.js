import {createStore,combineReducers,applyMiddleware} from 'redux'
import cakeReducer from './cakes/CakeReducer'
import icecreamReducer from './iceCream/icecreamReducer'
import logger from 'redux-logger'
import { composeWithDevTools } from '@redux-devtools/extension';
    

const reducer = combineReducers({
    cake : cakeReducer,
    icecream : icecreamReducer
})

const Store = createStore(reducer, composeWithDevTools(
    applyMiddleware(logger)
  ))


export default Store