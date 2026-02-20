import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect, useRef } from "react";
import { changeFuelType, changeMakeId, changeCity, clearFilter, changeBudget } from "../redux/filter/FilterActions";
import { fuelMap } from "../constants/fuelMap";
import '../styles/filter.css';
const toggle = (arr = [], v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function Filter() {
  const dispatch = useDispatch();
  const makeData = useSelector((s) => s.makeData.data || []);
  const cityData = useSelector((s) => s.cityData.data || []);
  const { fuel = [], budget = "0-50", makeIds = [], cityIds = [] } = useSelector((s) => s.filterData);

  console.log(fuel,"fuel this is")
  const [expanded, setExpanded] = useState({
    budget: true,
    make: true,
    city: true,
    fuel: true
  });

  const [makeSearch, setMakeSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  // Local state for budget (for immediate UI updates)
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(50);

  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState("50");

  // Debounce timer ref
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (!budget) return;

    let [min, max] = budget.split("-").map(Number);

    min = isNaN(min) ? 0 : Math.max(0, Math.min(min, 100));
    max = isNaN(max) ? 50 : Math.max(0, Math.min(max, 100));

    if (min > max) {
      [min, max] = [max, min]; 
    }


    setMinBudget(min);
    setMaxBudget(max);
    setMinInput(String(min));
    setMaxInput(String(max));

    // If we had to fix the values, update Redux with corrected budget
    const correctedBudget = `${min}-${max}`;
    if (correctedBudget !== budget) {
      dispatch(changeBudget(correctedBudget));
    }
  }, [budget, dispatch]);

  // useEffect(() => {
  //   // console.log("Filter component - Redux state:", { fuel, budget, makeIds, cityIds });
  // }, [fuel, budget, makeIds, cityIds]);

  const filteredMakes = useMemo(() =>
    makeData? makeData.filter((m) => m.makeName.toLowerCase().includes(makeSearch.toLowerCase())) : [],
    [makeData, makeSearch]
  );
  
  const filteredCities = useMemo(() =>
    cityData? cityData.filter((c) => c.CityName.toLowerCase().includes(citySearch.toLowerCase())) : [],
    [cityData, citySearch]
  );

function clearAll(){
    dispatch(clearFilter())
    setMinBudget(0);
    setMaxBudget(50);
    setMinInput(String(0));
    setMaxInput(String(50));

  }
  
  const toggleSection = (key) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  // Debounced budget change handler
  const handleBudgetChange = (newMin, newMax) => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Update local state immediately
    setMinBudget(newMin);
    setMaxBudget(newMax);
    setMinInput(String(newMin));
    setMaxInput(String(newMax));

    // Dispatch after 1 second
    debounceTimer.current = setTimeout(() =>  {
      dispatch(changeBudget(`${newMin}-${newMax}`));
    }, 1000);
  };

  // Handle min input change
  const handleMinInputChange = (e) => {
    const value = e.target.value;

    // Allow empty string or numbers only
    if (value === "" || /^\d+$/.test(value)) {
      setMinInput(value);

      // Only update budget if it's a valid number
      if (value !== "") {
        const num = Math.min(Number(value), 100);
        // Min cannot be greater than max
        const validMin = Math.min(num, maxBudget);
        handleBudgetChange(validMin, maxBudget);
      }
    }
  };

  // Handle max input change
  const handleMaxInputChange = (e) => {
    const value = e.target.value;

    // Allow empty string or numbers only
    if (value === "" || /^\d+$/.test(value)) {
      setMaxInput(value);

      // Only update budget if it's a valid number
      if (value !== "") {
        const num = Math.min(Number(value), 100);
        // Max cannot be less than min
        const validMax = Math.max(num, minBudget);
        handleBudgetChange(minBudget, validMax);
      }
    }
  };

  // Handle blur - validate and set proper value when user leaves input
  const handleMinBlur = () => {
    if (minInput === "") {
      setMinInput("0");
      handleBudgetChange(0, maxBudget);
    } else {
      const num = Math.min(Number(minInput), 100);
      const validMin = Math.min(num, maxBudget);
      setMinInput(String(validMin));
      if (validMin !== minBudget) {
        handleBudgetChange(validMin, maxBudget);
      }
    }
  };

  const handleMaxBlur = () => {
    if (maxInput === "") {
      setMaxInput("50");
      handleBudgetChange(minBudget, 50);
    } else {
      const num = Math.min(Number(maxInput), 100);
      const validMax = Math.max(num, minBudget);
      setMaxInput(String(validMax));
      if (validMax !== maxBudget) {
        handleBudgetChange(minBudget, validMax);
      }
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="filter-panel">
      {/* Fixed Header */}
      <div className="filter-main-header">
        <div className="filter-something">
          <img
            className="filter-logo"
            src="https://cdn-icons-png.flaticon.com/512/107/107799.png"
            alt="Filter"
          />
          <h4>Filters</h4>
        </div>
        <button className="clear-all-btn" onClick={() => clearAll()}>
          Clear All
        </button>
      </div>

      {/* Scrollable Content Wrapper */}
      <div className="filter-sections-wrapper">
        {/* Budget */}
        <div className="filter-section">
          <div className="section-header" onClick={() => toggleSection("budget")}>
            <h4>Budget (Lakh)</h4>
            <span className={`arrow-icon ${expanded.budget ? 'open' : ''}`}>▼</span>
          </div>
          <div className={`section-content ${expanded.budget ? 'open' : ''}`}>
            <div className="budget-styling">
              Rs. {minBudget === 0 ? '0' : `${minBudget} Lakh`} – {maxBudget === 100 ? '100+ Lakh' : `${maxBudget} Lakh`}
            </div>

            {/* Dual Range Slider */}
            <div className="dual-range-container">
              {/* Track background and active range */}
              <div className="slider-track">
                <div
                  className="slider-range"
                  style={{
                    left: `${minBudget}%`,
                    right: `${100 - maxBudget}%`
                  }}
                />
              </div>

              {/* Min Range Input */}
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                className="range-slider range-min"
                value={minBudget}
                onChange={(e) => {
                  const newMin = Math.min(Number(e.target.value), maxBudget);
                  handleBudgetChange(newMin, maxBudget);
                }}
              />

              {/* Max Range Input */}
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                className="range-slider range-max"
                value={maxBudget}
                onChange={(e) => {
                  const newMax = Math.max(Number(e.target.value), minBudget);
                  handleBudgetChange(minBudget, newMax);
                }}
              />

              {/* Labels */}
              <div className="slider-labels">
                <span>Any</span>
                <span>100+ Lakh</span>
              </div>
            </div>

            {/* Input Fields */}
            <div className="budget-inputs">
              <input
                type="text"
                className="budget-input-field"
                value={minInput}
                onChange={handleMinInputChange}
                onBlur={handleMinBlur}
                placeholder="0"
              />
              <span className="budget-separator">–</span>
              <input
                type="text"
                className="budget-input-field"
                value={maxInput}
                onChange={handleMaxInputChange}
                onBlur={handleMaxBlur}
                placeholder="50"
              />
            </div>
          </div>
        </div>

        {/* Make */}
        <div className="filter-section">
          <div className="section-header" onClick={() => toggleSection("make")}>
            <h4>Make / Model</h4>
            <span className={`arrow-icon ${expanded.make ? 'open' : ''}`}>▼</span>
          </div>
          <div className={`section-content ${expanded.make ? 'open' : ''}`}>
            <input
              className="search-box"
              placeholder="Search Make"
              value={makeSearch}
              onChange={(e) => setMakeSearch(e.target.value)}
            />
            <div className="scrollable-list">
              {filteredMakes.map((m) => (
                <label className="checkbox-container" key={m.makeId}>
                  <input
                    type="checkbox"
                    checked={makeIds.includes(m.makeId)}
                    onChange={() => dispatch(changeMakeId(toggle(makeIds, m.makeId)))}
                  />
                  {m.makeName}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* City */}
        <div className="filter-section">
          <div className="section-header" onClick={() => toggleSection("city")}>
            <h4>City</h4>
            <span className={`arrow-icon ${expanded.city ? 'open' : ''}`}>▼</span>
          </div>
          <div className={`section-content ${expanded.city ? 'open' : ''}`}>
            <input
              className="search-box"
              placeholder="Search City"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
            />
            <div className="scrollable-list">
              {filteredCities.slice(0, 50).map((c) => (
                <label className="checkbox-container" key={c.CityId}>
                  <input
                    type="checkbox"
                    checked={cityIds.includes(c.CityId)}
                    onChange={() => dispatch(changeCity(toggle(cityIds, c.CityId)))}
                  />
                  {c.CityName}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Fuel */}
        <div className="filter-section">
          <div className="section-header" onClick={() => toggleSection("fuel")}>
            <h4>Fuel</h4>
            <span className={`arrow-icon ${expanded.fuel ? 'open' : ''}`}>▼</span>
          </div>
          <div className={`section-content ${expanded.fuel ? 'open' : ''}`}>
            <div className="scrollable-list">
              {Object.entries(fuelMap).map(([k, v]) => (
                <label className="checkbox-container" key={v}>
                  <input
                    type="checkbox"
                    checked={fuel.includes(v)}
                    onChange={() => dispatch(changeFuelType(toggle(fuel, v)))}
                  />
                  {k}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
