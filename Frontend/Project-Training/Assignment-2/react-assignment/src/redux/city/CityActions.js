import { FETCH_CITY_REQUEST, FETCH_CITY_FAILURE, FETCH_CITY_SUCCESS } from "./CityTypes"
import { CITY_API } from "../../utils/api"
function fetchCityRequest() {
    return {
        type: FETCH_CITY_REQUEST
    }
}

function fetchCitySuccess(data) {
    return {
        type: FETCH_CITY_SUCCESS,
        payload: data
    }
}

function fetchCityFailure(error) {
    return {
        type: FETCH_CITY_FAILURE,
        payload: error
    }
}
const fetchCity = () => {
    return async function (dispatch) {
        dispatch(fetchCityRequest());

        try {
            const response = await fetch(CITY_API);

            if (!response.ok) {
                throw new Error("Server error while fetching cities");
            }

            const data = await response.json();
            dispatch(fetchCitySuccess(data));

        } catch (error) {
            dispatch(fetchCityFailure(error.message));
        }
    };
};


export default fetchCity

