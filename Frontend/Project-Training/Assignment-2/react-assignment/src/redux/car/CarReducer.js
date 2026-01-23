import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE
} from "./CarTypes";

const initialState = {
  loading: false,
  isFetchingNext: false,  
  data: [],
  error: ""
};

const CarReducer = (state = initialState, action) => {
  switch (action.type) {
case FETCH_CARS_REQUEST:
  return {
    ...state,
    loading: true,
    isFetchingNext: action.append || false
  };

case FETCH_CARS_SUCCESS:
  return {
    ...state,
    loading: false,
    isFetchingNext: false,  
    data: action.append
      ? {
          ...action.payload,
          stocks: [
            ...(state.data.stocks || []),
            ...(action.payload.stocks || [])
          ]
        }
      : action.payload
  };
    case FETCH_CARS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default CarReducer;




