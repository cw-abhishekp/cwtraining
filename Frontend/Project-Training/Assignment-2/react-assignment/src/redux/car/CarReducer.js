import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./CarTypes"

const initialState = {
    loading : false,
    data : [],
    error : ''
}

const CarReducer = (state = initialState,action) =>{
    switch(action.type){
        case FETCH_USERS_REQUEST: return{
            ...state,
            loading :true
        }

        case FETCH_USERS_SUCCESS: return{
            ...state,
            loading :false,
            error : '',
            data : action.payload
        }

        case FETCH_USERS_FAILURE: return{
            ...state,
            loading :false,
            error : action.payload,
            data : []
        }
        default: return state
    }
}

export default CarReducer