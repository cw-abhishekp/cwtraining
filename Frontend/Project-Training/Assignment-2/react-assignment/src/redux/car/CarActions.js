import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from "./CarTypes"
import axios from 'axios'

function fetchUsersRequest() {
    return {
        type: FETCH_USERS_REQUEST
    }
}

function fetchUsersSuccess(data) {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data
    }
}

function fetchUsersFailure(error) {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const fetchUsers = () => {
  return async function (dispatch) {
    dispatch(fetchUsersRequest());

    await fetch("http://localhost:5000/api/stocks")
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};



export default fetchUsers