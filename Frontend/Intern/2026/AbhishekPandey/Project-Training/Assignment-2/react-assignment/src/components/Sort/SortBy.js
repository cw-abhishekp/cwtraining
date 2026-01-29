import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBudget,changeCity,changeFuelType,changeMakeId,changeSortBy } from "../../redux/filter/FilterActions";
const SortBy = ({ array }) => {
  const dispatch = useDispatch();
  const sortBy = useSelector((store) => store.filterData.sortBy);
  const [arr, setArr] = useState(array);
  useEffect(() => {
    setArr(array);
  }, [array]);

  const removeFilter = (index) => {
    const newArr = [...arr];
    newArr[index] = false;
    setArr(newArr);

    if (index === 0) dispatch(changeFuelType([]));
    if (index === 1) dispatch(changeMakeId([]));
    if (index === 2) dispatch(changeCity([]));
    if (index === 3) dispatch(changeBudget("0-50"));
  };

  return (
    <div className="sort-row">
      <div className="filters">
        {arr[0] && (
          <span className="chip">
            Fuel <button onClick={() => removeFilter(0)}>×</button>
          </span>
        )}
        {arr[1] && (
          <span className="chip">
            Model <button onClick={() => removeFilter(1)}>×</button>
          </span>
        )}
        {arr[2] && (
          <span className="chip">
            City <button onClick={() => removeFilter(2)}>×</button>
          </span>
        )}
        {arr[3] && (
          <span className="chip">
            Budget <button onClick={() => removeFilter(3)}>×</button>
          </span>
        )}
      </div>
      <div className="sort-box">
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
        <div>
</div>

    </div>
  );
};

export default SortBy;
