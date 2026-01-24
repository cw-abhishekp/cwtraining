import { FETCH_CITY_REQUEST, FETCH_CITY_FAILURE, FETCH_CITY_SUCCESS } from "./CityTypes"

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
            const response = await fetch("http://localhost:5000/api/cities");

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

