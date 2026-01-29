import { createStore, applyMiddleware, combineReducers } from 'redux'
import CarReducer from '../redux/car/CarReducer'
import FilterReducer from '../redux/filter/FilterReducer';
import { thunk } from 'redux-thunk';
import MakeReducer from '../redux/make/MakeReducer';
import CityReducer from '../redux/city/CityReducer';

const reducer = combineReducers({
    carData: CarReducer,
    filterData: FilterReducer,
    makeData: MakeReducer,
    cityData: CityReducer
})

const Store = createStore(reducer, applyMiddleware(thunk))

export default Store