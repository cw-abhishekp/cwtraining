import {createStore,applyMiddleware} from 'redux'
import CarReducer from '../redux/car/CarReducer'
import { thunk } from 'redux-thunk';

const Store = createStore(CarReducer,applyMiddleware(thunk))

export default Store