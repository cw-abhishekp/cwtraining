import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeSortBy } from "../../redux/Filter/FilterActions";
import { useSortFilterData } from "../../utils/sortByUtils";

const SortBy = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((store) => store.filterData.sortBy);
   const {
   removeFuelItem,
    removeMakeItem,
    removeCityItem,
    removeBudget,
    getFuelNames,
    getMakeNames,
    getCityNames,
    getBudgetDisplay,
  } = useSortFilterData();

  const fuelNames = getFuelNames();
  const makeNames = getMakeNames();
  const cityNames = getCityNames();
  const budgetDisplay = getBudgetDisplay();

  return (
    <div className="sort-row">
      <div className="filters">
        {/* Fuel Chips */}
        {fuelNames.map((fuel, index) => (
          <span className="chip" key={`fuel-${index}`}>
            {fuel} <button onClick={() => removeFuelItem(fuel)}>×</button>
          </span>
        ))}

        {/* Make Chips */}
        {makeNames.map((make, index) => (
          <span className="chip" key={`make-${index}`}>
            {make} <button onClick={() => removeMakeItem(make)}>×</button>
          </span>
        ))}

        {/* City Chips */}
        {cityNames.map((city, index) => (
          <span className="chip" key={`city-${index}`}>
            {city} <button onClick={() => removeCityItem(city)}>×</button>
          </span>
        ))}

        {/* Budget Chip */}
        {budgetDisplay && (
          <span className="chip">
            {`Budget: ${budgetDisplay}`} <button onClick={removeBudget}>×</button>
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
          <option value="BestMatch">Best Match</option>
          <option value="PriceAsc">Price: Low to High</option>
          <option value="PriceDesc">Price: High to Low</option>
          <option value="YearAsc">Year: Old to New</option>
          <option value="YearDesc">Year: New to Old</option>
        </select>
      </div>
    </div>
  );
};

export default SortBy;



