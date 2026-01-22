import { FETCH_MAKE_ID_REQUEST, FETCH_MAKE_ID_FAILURE, FETCH_MAKE_ID_SUCCESS } from "./MakeTypes"

function fetchMakeIdRequest() {
    return {
        type: FETCH_MAKE_ID_REQUEST
    }
}

function fetchMakeIdSuccess(data) {
    return {
        type: FETCH_MAKE_ID_SUCCESS,
        payload: data
    }
}

function fetchMakeIdFailure(error) {
    return {
        type: FETCH_MAKE_ID_FAILURE,
        payload: error
    }
}
const fetchMake = () => {
    return async function (dispatch) {
        dispatch(fetchMakeIdRequest());

        await fetch("http://localhost:5000/api/v2/makes/?type=new")
            .then((response) => response.json())
            .then((data) => {
                dispatch(fetchMakeIdSuccess(data));
            })
            .catch((error) => {
                dispatch(fetchMakeIdFailure(error.message));
            });
    };
};

export default fetchMake