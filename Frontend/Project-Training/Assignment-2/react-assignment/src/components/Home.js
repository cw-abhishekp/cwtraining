import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchMake from "../redux/make/MakeActions";
import fetchCity from "../redux/city/CityActions";
import fetchUsers from "../redux/car/CarActions";
import Card from "./Card";
import Filter from "./Filter";
import SortBy from "./sort/sortBy";
import sortData from "./sort/sortData";
import "../styles/home.css";

function Home() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.carData);
  const filters = useSelector(state => state.filterData);
  console.log(data)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchMake());
    dispatch(fetchCity());
  }, []);

  const sortedStocks = useMemo(() => {
    return sortData(data?.stocks || [], filters.sortBy);
  }, [data, filters.sortBy]);

  if (loading) return <p>Loading...</p>;

  return (
  <div className="grid">
  <Filter />
  <div>
    <SortBy />
    <div className="car-list">
      {sortedStocks.map(car => (
        <Card key={car.profileId} data={car} />
      ))}
    </div>
  </div>
</div>
  );
}

export default Home;


// import React, { useEffect, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import fetchMake from "../redux/make/MakeActions";
// import fetchCity from "../redux/city/CityActions";
// import fetchUsers from "../redux/car/CarActions";
// import Card from "./Card";
// import Filter from "./Filter";
// import SortBy from "./sort/sortBy";
// import sortData from "./sort/sortData";

// function Home() {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector(state => state.carData);
//   const filters = useSelector(state => state.filterData);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [filters]);  

//   useEffect(() => {
//     dispatch(fetchMake());
//     dispatch(fetchCity());
//   }, []);

//   const sortedStocks = useMemo(() => {
//     return sortData(data?.stocks || [], filters.sortBy);
//   }, [data, filters.sortBy]);

//   if (loading && !data?.stocks?.length) return <p>Loading...</p>;

//   return (
//     <div className="grid">
//       <Filter />
//       <SortBy />
//       {sortedStocks.length === 0 && <p>No cars found for selected filters.</p>}
//       {sortedStocks.map(car => (
//         <Card key={car.profileId} data={car} />
//       ))}
//       {loading && <p style={{ textAlign: "center" }}>Loading more cars...</p>}
//     </div>
//   );
// }

// export default Home;

