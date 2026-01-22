    import { FETCH_CITY_REQUEST, FETCH_CITY_FAILURE, FETCH_CITY_SUCCESS } from "./CityTypes"

    const initialState = {
        loading : false,
        data : [],
        error : ''
    }

    const  CityReducer = (state = initialState,action) =>{
        switch(action.type){
            case FETCH_CITY_REQUEST: return{
                ...state,
                loading :true
            }

            case FETCH_CITY_SUCCESS: return{
                ...state,
                loading :false,
                error : '',
                data : action.payload
            }

            case FETCH_CITY_FAILURE: return{
                ...state,
                loading :false,
                error : action.payload,
                data : []
            }
            default: return state
        }
    }

    export default CityReducer