import { FETCH_CARS_FAILURE, FETCH_CARS_REQUEST, FETCH_CARS_SUCCESS } from "./CarTypes";
import { CARS_API, HOST_API } from "../../utils/api";

function fetchCarsRequest(nextPage) {
  return {
    type: FETCH_CARS_REQUEST,
    append: !!nextPage
  }
}

function fetchCarsSuccess(data, nextPage) {
  return {
    type: FETCH_CARS_SUCCESS,
    payload: data,
    append: !!nextPage
  }
}

function fetchCarsFailure(error) {
  return {
    type: FETCH_CARS_FAILURE, payload: error
  }
}


const fetchCars = (nextPage = null) => async (dispatch, getState) => {
  const { carData } = getState();
  if (carData.isFetchingNext) return;

  try {
    dispatch(fetchCarsRequest(nextPage));
    let url = CARS_API;

    if (nextPage) {
      url = HOST_API + nextPage;
    } else {
      const { filterData } = getState();
      const params = [];

      if (filterData.fuel.length) params.push(`fuel=${filterData.fuel.join("+")}`);
      if (filterData.budget) params.push(`budget=${filterData.budget}`);
      if (filterData.makeIds.length) params.push(`car=${filterData.makeIds.join("+")}`);
      if (filterData.cityIds.length) params.push(`city=${filterData.cityIds.join("+")}`);
      if (filterData.sortBy && filterData.sortBy !== "") {
        params.push(`sortBy=${filterData.sortBy}`);
      }

      if (params.length) url += "?" + params.join("&");
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data = await response.json();


    dispatch(fetchCarsSuccess(data, nextPage));
  } catch (err) {
    dispatch(fetchCarsFailure(err.message));
  }
};

export default fetchCars





