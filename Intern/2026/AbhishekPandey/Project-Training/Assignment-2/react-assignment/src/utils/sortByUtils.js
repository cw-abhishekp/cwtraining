import { useDispatch, useSelector } from "react-redux";
import {useCallback } from "react";
import { 
  changeBudget, 
  changeCity, 
  changeFuelType, 
  changeMakeId 
} from "../redux/Filter/FilterActions";
import { fuelMap } from "../constants/fuelMap";

export const useSortFilterData = () => {
  const dispatch = useDispatch();
  const filters = useSelector((store) => store.filterData);
  const makeData = useSelector((s) => s.makeData.data || []);
  const cityData = useSelector((s) => s.cityData.data || []);

  // Get fuel names from filter values
const getFuelNames = useCallback(() => {
  if (!filters.fuel || filters.fuel.length === 0) return [];
  return filters.fuel
    .map(fuelValue => {
      const entry = Object.entries(fuelMap).find(([key, val]) => val === fuelValue);
      return entry ? entry[0] : null;
    })
    .filter(name => name !== null); 
}, [filters.fuel]);

  // Get make names from makeIds
  const getMakeNames = useCallback(() => {
    if (!filters.makeIds || filters.makeIds.length === 0) return [];
    return filters.makeIds.map(id => {
      const make = makeData.find(m => m.makeId === id);
      return make ? make.makeName : '';
    }).filter(Boolean);
  }, [filters.makeIds, makeData]);

  // Get city names from cityIds
  const getCityNames = useCallback(() => {
    if (!filters.cityIds || filters.cityIds.length === 0) return [];
    return filters.cityIds.map(id => {
      const city = cityData.find(c => c.cityId === id);
      return city ? city.cityName : '';
    }).filter(Boolean);
  }, [filters.cityIds, cityData]);

  // Get budget display string
const getBudgetDisplay = useCallback(() => {
  if (!filters.budget || filters.budget === "") return null;
  const [min, max] = filters.budget.split("-");
  return `₹${min}-${max} Lakh`;
}, [filters.budget]);


  // Remove fuel item
  const removeFuelItem = useCallback((fuelName) => {
    const fuelValue = fuelMap[fuelName];
    const newFuel = filters.fuel.filter(f => f !== fuelValue);
    dispatch(changeFuelType(newFuel));
  }, [filters.fuel, dispatch]);

  // Remove make item
  const removeMakeItem = useCallback((makeName) => {
    const make = makeData.find(m => m.makeName === makeName);
    if (make) {
      const newMakeIds = filters.makeIds.filter(id => id !== make.makeId);
      dispatch(changeMakeId(newMakeIds));
    }
  }, [makeData, filters.makeIds, dispatch]);

  // Remove city item
  const removeCityItem = useCallback((cityName) => {
    const city = cityData.find(c => c.cityName === cityName);
    if (city) {
      const newCityIds = filters.cityIds.filter(id => id !== city.cityId);
      dispatch(changeCity(newCityIds));
    }
  }, [cityData, filters.cityIds, dispatch]);

  // Remove budget
  const removeBudget = useCallback(() => {
    dispatch(changeBudget(""));
  }, [dispatch]);

  return {
    removeFuelItem,
    removeMakeItem,
    removeCityItem,
    removeBudget,
    getFuelNames,
    getMakeNames,
    getCityNames,
    getBudgetDisplay,
  };
};