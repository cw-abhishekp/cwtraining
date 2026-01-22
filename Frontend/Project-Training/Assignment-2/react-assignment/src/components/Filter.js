// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   changeFuelType,
//   changeMakeId,
//   changeCity,
//   clearFilter,
//   changeBudget
// } from "../redux/Filter/FilterActions";
// import fetchMake from "../redux/make/MakeActions";
// import fetchCity from "../redux/city/CityActions";
// import { fuelMap } from "../constants/fuelMap";

// const toggle = (arr = [], v) =>
//   arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

// function Filter() {
//   const dispatch = useDispatch();

//   const makeData = useSelector(s => s.makeData.data || []);
//   const cityData = useSelector(s => s.cityData.data || []);
//   const { fuel = [], budget = "0-21", makeIds = [], cityIds = [] } =
//     useSelector(s => s.filterData);
//   return (
//     <div className="filterPanel">
//       <h4>Budget (Lakhs)</h4>
//       <input
//         type="range"
//         min="0"
//         max="50"
//         value={budget.split("-")[1]}
//         onChange={e => dispatch(changeBudget(`0-${e.target.value}`))}
//       />

//       <h4>Fuel</h4>
//       {Object.entries(fuelMap).map(([k, v]) => (
//         <label key={v}>
//           <input
//             type="checkbox"
//             checked={fuel.includes(v)}
//             onChange={() => dispatch(changeFuelType(toggle(fuel, v)))}
//           />
//           {k}
//         </label>
//       ))}

//       <h4>Make</h4>
//       {makeData.map(m => (
//         <label key={m.makeId}>
//           <input
//             type="checkbox"
//             checked={makeIds.includes(m.makeId)}
//             onChange={() => dispatch(changeMakeId(toggle(makeIds, m.makeId)))}
//           />
//           {m.makeName}
//         </label>
//       ))}

//       <h4>City</h4>
//       {cityData.slice(0, 20).map(c => (
//         <label key={c.CityId}>
//           <input
//             type="checkbox"
//             checked={cityIds.includes(c.CityId)}
//             onChange={() => dispatch(changeCity(toggle(cityIds, c.CityId)))}
//           />
//           {c.CityName}
//         </label>
//       ))}

//       <button onClick={() => dispatch(clearFilter())}>Clear</button>
//     </div>
//   );
// }

// export default Filter;

import { useDispatch, useSelector } from "react-redux";
import {
  changeFuelType,
  changeMakeId,
  changeCity,
  clearFilter,
  changeBudget
} from "../redux/Filter/FilterActions";
import { fuelMap } from "../constants/fuelMap";

const toggle = (arr = [], v) =>
  arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

function Filter() {
  const dispatch = useDispatch();

  const makeData = useSelector(s => s.makeData.data || []);
  const cityData = useSelector(s => s.cityData.data || []);
  const { fuel = [], budget = "0-21", makeIds = [], cityIds = [] } =
    useSelector(s => s.filterData);

 const [minBudget, maxBudget] = budget
    ? budget.split("-").map(Number)
    : [0, 21]; 
    
  console.log(budget)
  return (
    <div className="filterPanel">
      {/* Budget */}
      <div className="filter-section">
      <h4>Budget (Lakhs)</h4>
      <div className="budget-value">
        ₹ {minBudget} – {maxBudget} Lakh
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={maxBudget} // show current selected value
        onChange={(e) => dispatch(changeBudget(`${minBudget}-${e.target.value}`))}
      />
    </div>

      {/* Fuel */}
      <div className="filter-section">
        <h4>Fuel Type</h4>
        {Object.entries(fuelMap).map(([k, v]) => (
          <label className="filter-item" key={v}>
            <input
              type="checkbox"
              checked={fuel.includes(v)}
              onChange={() => dispatch(changeFuelType(toggle(fuel, v)))}
            />
            {k}
          </label>
        ))}
      </div>

      {/* Make */}
      <div className="filter-section">
        <h4>Make</h4>
        {makeData.map(m => (
          <label className="filter-item" key={m.makeId}>
            <input
              type="checkbox"
              checked={makeIds.includes(m.makeId)}
              onChange={() =>
                dispatch(changeMakeId(toggle(makeIds, m.makeId)))
              }
            />
            {m.makeName}
          </label>
        ))}
      </div>

      {/* City */}
      <div className="filter-section">
        <h4>City</h4>
        {cityData.slice(0, 20).map(c => (
          <label className="filter-item" key={c.CityId}>
            <input
              type="checkbox"
              checked={cityIds.includes(c.CityId)}
              onChange={() =>
                dispatch(changeCity(toggle(cityIds, c.CityId)))
              }
            />
            {c.CityName}
          </label>
        ))}
      </div>

      <button className="clear-btn" onClick={() => dispatch(clearFilter())}>
        Clear All Filters
      </button>
    </div>
  );
}

export default Filter;

