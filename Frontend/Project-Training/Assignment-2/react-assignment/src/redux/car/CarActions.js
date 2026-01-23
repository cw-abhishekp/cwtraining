import axios from "axios";

// const fetchUsers = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: "FETCH_CARS_REQUEST" });

//     const { filterData } = getState();

//     let url = "http://localhost:5000/api/stocks";
//     const params = [];

//     if (filterData.fuel.length)
//       params.push(`fuel=${filterData.fuel.join("+")}`);

//     if (filterData.budget)
//       params.push(`budget=${filterData.budget}`);

//     if (filterData.makeIds.length)
//       params.push(`car=${filterData.makeIds.join("+")}`);

//     if (filterData.cityIds.length)
//       params.push(`city=${filterData.cityIds.join("+")}`);

//     if (params.length) url += "?" + params.join("&");

//     console.log(url)
//     const { data } = await axios.get(url);
//     dispatch({ type: "FETCH_CARS_SUCCESS", payload: data });
//   } catch (err) {
//     dispatch({ type: "FETCH_CARS_FAILURE", payload: err.message });
//   }
// };

// export default fetchUsers;


const fetchUsers = (nextPage = null) => async (dispatch, getState) => {
  const { carData } = getState();

  if (carData.isFetchingNext) return;

  try {
    dispatch({
      type: "FETCH_CARS_REQUEST",
      append: !!nextPage
    });

    let url = "http://localhost:5000/api/stocks";

    if (nextPage) {
      url = "http://localhost:5000" + nextPage;
    } else {
      const { filterData } = getState();
      const params = [];

      if (filterData.fuel.length)
        params.push(`fuel=${filterData.fuel.join("+")}`);
      if (filterData.budget)
        params.push(`budget=${filterData.budget}`);
      if (filterData.makeIds.length)
        params.push(`car=${filterData.makeIds.join("+")}`);
      if (filterData.cityIds.length)
        params.push(`city=${filterData.cityIds.join("+")}`);

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



// const fetchUsers = (nextPage = null) => async (dispatch, getState) => {
//   const { carData } = getState();

//   // ⛔ Prevent duplicate fast calls
//   if (carData.isFetchingNext) return;

//   try {
//     dispatch({
//       type: "FETCH_CARS_REQUEST",
//       append: !!nextPage
//     });

//     let url = "http://localhost:5000/api/stocks";

//     if (nextPage) {
//       url = "http://localhost:5000" + nextPage;
//     } else {
//       const { filterData } = getState();
//       const params = [];

//       if (filterData.fuel.length)
//         params.push(`fuel=${filterData.fuel.join("+")}`);
//       if (filterData.budget)
//         params.push(`budget=${filterData.budget}`);
//       if (filterData.makeIds.length)
//         params.push(`car=${filterData.makeIds.join("+")}`);
//       if (filterData.cityIds.length)
//         params.push(`city=${filterData.cityIds.join("+")}`);

//       if (params.length) url += "?" + params.join("&");
//     }

//     const { data } = await axios.get(url);

//     dispatch({
//       type: "FETCH_CARS_SUCCESS",
//       payload: data,
//       append: !!nextPage
//     });
//   } catch (err) {
//     dispatch({ type: "FETCH_CARS_FAILURE", payload: err.message });
//   }
// };



export default fetchUsers