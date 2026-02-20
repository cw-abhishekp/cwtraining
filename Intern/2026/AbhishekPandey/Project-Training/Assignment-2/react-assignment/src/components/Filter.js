import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect, useRef, useEffectEvent } from "react";
import { changeFuelType, changeMakeId, changeCity, clearFilter, changeBudget } from "../redux/Filter/FilterActions";
import { fuelMap } from "../constants/fuelMap";
import '../styles/filter.css';
import { BUDGET_PRESETS } from "../constants/budgets";

const toggle = (arr = [], v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function Filter() {
  const dispatch = useDispatch();
  const makeData = useSelector((s) => s.makeData.data || []);
  const cityData = useSelector((s) => s.cityData.data || []);
  const { fuel = [], budget = "0-100", makeIds = [], cityIds = [] } = useSelector((s) => s.filterData);
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
  const [maxBudget, setMaxBudget] = useState(100);

  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState("100");

  // Debounce timer ref
  const debounceTimer = useRef(null);
  useEffect(() => {
    if (!budget) {
      setMinBudget(0);
      setMaxBudget(100);
      setMinInput("0");
      setMaxInput("100");
      return
    };

    let [min, max] = budget.split("-").map(Number);
    min = isNaN(min) ? 0 : Math.max(0, Math.min(min, 100));
    max = isNaN(max) ? 100 : Math.max(0, Math.min(max, 100));

    if (min > max) {
      [min, max] = [max, min];
    }
    setMinBudget(min);
    setMaxBudget(max);
    setMinInput(String(min));
    setMaxInput(String(max));

    const correctedBudget = `${min}-${max}`;
    if (correctedBudget !== budget) {
      dispatch(changeBudget(correctedBudget));
    }
  }, [budget, dispatch]);

  const filteredMakes = useMemo(() =>
    makeData ? makeData.filter((m) => m.makeName.toLowerCase().includes(makeSearch.toLowerCase())) : [],
    [makeData, makeSearch]
  );

  const filteredCities = useMemo(() =>
    cityData ? cityData.filter((c) => c.cityName.toLowerCase().includes(citySearch.toLowerCase())) : [],
    [cityData, citySearch]
  );

  function clearAll() {
    dispatch(clearFilter())
    setMinBudget(0);
    setMaxBudget(100);
    setMinInput(String(0));
    setMaxInput(String(100));
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
    debounceTimer.current = setTimeout(() => {
      dispatch(changeBudget(`${newMin}-${newMax}`));
    }, 1000);
  };

  const handleMinInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMinInput(value);
      if (value === "") {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        return;
      }
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      const num = Number(value);
      const cappedNum = Math.min(num, 100);
      // setMinBudget(cappedNum);
      debounceTimer.current = setTimeout(() => {
        const validMin = Math.min(cappedNum, maxBudget);
        setMinBudget(validMin);
        setMinInput(String(validMin));
        dispatch(changeBudget(`${validMin}-${maxBudget}`));
      }, 1000);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMaxInput(value);

      if (value === "") {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        return;
      }
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      const num = Number(value);
      const cappedNum = Math.min(num, 100);

      // setMaxBudget(cappedNum);
      debounceTimer.current = setTimeout(() => {
        const validMax = Math.max(cappedNum, minBudget);
        setMaxBudget(validMax);
        setMaxInput(String(validMax));
        dispatch(changeBudget(`${minBudget}-${validMax}`));
      }, 1000);
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

  // Handle budget pill click
  const handleBudgetPresetClick = (min, max) => {
    handleBudgetChange(min, max);
  };

  // Check if a preset is active
  const isPresetActive = (min, max) => {
    return minBudget === min && maxBudget === max;
  };

  // Increment/Decrement handlers for Min
  const handleMinIncrement = () => {
    const newMin = Math.min(minBudget + 1, maxBudget);
    handleBudgetChange(newMin, maxBudget);
  };

  const handleMinDecrement = () => {
    const newMin = Math.max(minBudget - 1, 0);
    handleBudgetChange(newMin, maxBudget);
  };

  // Increment/Decrement handlers for Max
  const handleMaxIncrement = () => {
    const newMax = Math.min(maxBudget + 1, 100);
    handleBudgetChange(minBudget, newMax);
  };

  const handleMaxDecrement = () => {
    const newMax = Math.max(maxBudget - 1, minBudget);
    handleBudgetChange(minBudget, newMax);
  };


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

            <div className="budget-pills">
              {BUDGET_PRESETS.map((preset, index) => (
                <button
                  key={index}
                  className={`budget-pill ${isPresetActive(preset.min, preset.max) ? 'active' : ''}`}
                  onClick={() => handleBudgetPresetClick(preset.min, preset.max)}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="budget-styling">
              ₹ {minBudget === 0 ? '0' : `${minBudget} Lakh`} – {maxBudget === 100 ? '100+ Lakh' : `${maxBudget} Lakh`}
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
            {/* Input Fields with Arrows INSIDE */}
            <div className="budget-inputs">
              {/* Min Input with Arrows INSIDE */}
              <div className="budget-input-wrapper">
                <input
                  type="text"
                  className="budget-input-field"
                  value={minInput}
                  onChange={handleMinInputChange}
                // onBlur={handleMinBlur}
                />
                <div className="input-arrows">
                  <button className="arrow-btn arrow-up" onClick={handleMinIncrement}>▲</button>
                  <button className="arrow-btn arrow-down" onClick={handleMinDecrement}>▼</button>
                </div>
              </div>

              <span className="budget-separator">–</span>

              {/* Max Input with Arrows INSIDE */}
              <div className="budget-input-wrapper">
                <input
                  type="text"
                  className="budget-input-field"
                  value={maxInput}
                  onChange={handleMaxInputChange}
                // onBlur={handleMaxBlur}
                />
                <div className="input-arrows">
                  <button className="arrow-btn arrow-up" onClick={handleMaxIncrement}>▲</button>
                  <button className="arrow-btn arrow-down" onClick={handleMaxDecrement}>▼</button>
                </div>
              </div>
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
                <label className="checkbox-container" key={c.cityId}>
                  <input
                    type="checkbox"
                    checked={cityIds.includes(c.cityId)}
                    onChange={() => dispatch(changeCity(toggle(cityIds, c.cityId)))}
                  />
                  {c.cityName}
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
