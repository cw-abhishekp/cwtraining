import { FETCH_MAKE_ID_REQUEST, FETCH_MAKE_ID_FAILURE, FETCH_MAKE_ID_SUCCESS } from "./MakeTypes"

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const MakeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MAKE_ID_REQUEST: return {
            ...state,
            loading: true
        }

        case FETCH_MAKE_ID_SUCCESS: return {
            ...state,
            loading: false,
            error: '',
            data: action.payload
        }

        case FETCH_MAKE_ID_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload,
            data: []
        }
        default: return state
    }
}

export default MakeReducer