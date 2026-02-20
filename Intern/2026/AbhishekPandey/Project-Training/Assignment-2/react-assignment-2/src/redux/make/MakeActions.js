import { FETCH_MAKE_ID_REQUEST, FETCH_MAKE_ID_FAILURE, FETCH_MAKE_ID_SUCCESS } from "./MakeTypes"
import { MAKE_API } from "../../utils/api";
export const fetchMakeIdRequest = () => {
  return { type: "FETCH_MAKE_ID_REQUEST" };
};

export const fetchMakeIdSuccess = (data) => {
  return { type: "FETCH_MAKE_ID_SUCCESS", payload: data };
};

export const fetchMakeIdFailure = (error) => {
  return { type: "FETCH_MAKE_ID_FAILURE", payload: error };
};

const fetchMake = () => {
    return async function (dispatch) {
        dispatch(fetchMakeIdRequest());

        try {
            const response = await fetch(MAKE_API);

            if (!response.ok) {
                throw new Error("Server error while fetching cars");
            }

            const data = await response.json();
            dispatch(fetchMakeIdSuccess(data));

        } catch (error) {
            dispatch(fetchMakeIdFailure(error.message));
        }
    };
};


export default fetchMake