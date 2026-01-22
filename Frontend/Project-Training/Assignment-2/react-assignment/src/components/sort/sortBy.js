import React from "react";
import { changeSortBy } from "../../redux/Filter/FilterActions";
import { useDispatch, useSelector } from "react-redux";

const SortBy = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector(store => store.filterData.sortBy);

  return (
   <select value={sortBy} onChange={e => dispatch(changeSortBy(e.target.value))}>
  <option value="Price - Low to High">Price - Low to High</option>
  <option value="Price - High to Low">Price - High to Low</option>
  <option value="Year - Old to New">Year - Old to New</option>
  <option value="Year - New to Old">Year - New to Old</option>
</select>
  );
};

export default SortBy;
