import React from "react";
import { changeSortBy } from "../../redux/filter/FilterActions";
import { useDispatch, useSelector } from "react-redux";

const SortBy = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((store) => store.filterData.sortBy);

  return (
    <div>
      Sort By:&nbsp;
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => dispatch(changeSortBy(e.target.value))}
      >
        <option value="Best Match">Best Match</option>
        <option value="Price - Low to High">Price: Low to High</option>
        <option value="Price - High to Low">Price: High to Low</option>
        <option value="Year - Old to New">Year: Old to New</option>
        <option value="Year - New to Old">Year: New to Old</option>
      </select>
    </div>
  );
};

export default SortBy;
