import axios from "axios";
import { CARS_API, HOST_API } from "../../utils/api";

const fetchCars = (nextPage = null) => async (dispatch, getState) => {
  const { carData } = getState();
  if (carData.isFetchingNext) return;

  try {
    dispatch({
      type: "FETCH_CARS_REQUEST",
      append: !!nextPage
    });

    let url = CARS_API

    if (nextPage) {
      url = HOST_API + nextPage;
    } else {
      const { filterData } = getState();
      const params = [];

      if (filterData.fuel.length) params.push(`fuel=${filterData.fuel.join("+")}`);
      if (filterData.budget) params.push(`budget=${filterData.budget}`);
      if (filterData.makeIds.length) params.push(`car=${filterData.makeIds.join("+")}`);
      if (filterData.cityIds.length) params.push(`city=${filterData.cityIds.join("+")}`);

      if (params.length) url += "?" + params.join("&");
    }

    const { data } = await axios.get(url);

    dispatch({
      type: "FETCH_CARS_SUCCESS",
      payload: data,
      append: !!nextPage
    });
  } catch (err) {
    dispatch({ type: "FETCH_CARS_FAILURE", payload: err.message });
  }
};

export default fetchCars