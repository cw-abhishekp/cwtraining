import {
    CHANGE_FUEL_TYPE,
    CHANGE_BUDGET,
    CHANGE_SORT_BY,
    CLEAR_FILTER,
    CHANGE_CITY,
    CHANGE_MAKE_ID
} from './FilterTypes'

const initialState = {
    fuel: [],
    budget: "",
    makeIds: [],
    cityIds: [],
    sortBy: ""
};

const FilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FUEL_TYPE:
            return { ...state, fuel: action.payload };

        case CHANGE_BUDGET:
            return { ...state, budget: action.payload };

        case CHANGE_SORT_BY:
            return { ...state, sortBy: action.payload };

        case CHANGE_CITY:
            return { ...state, cityIds: action.payload };

        case CHANGE_MAKE_ID:
            return { ...state, makeIds: action.payload };

        case CLEAR_FILTER:
            return initialState;

        default:
            return state;
    }
};

export default FilterReducer;
