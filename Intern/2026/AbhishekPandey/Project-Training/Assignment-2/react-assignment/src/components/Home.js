import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchMake from "../redux/make/MakeActions";
import fetchCity from "../redux/city/CityActions";
import fetchCars from "../redux/car/CarActions";
import { changeFuelType, changeMakeId, changeCity, changeBudget, changeSortBy } from "../redux/Filter/FilterActions";
import Card from "./Card_Carousel";
import Filter from "./Filter";
import SortBy from "./sort/sortBy";
import sortData from "./sort/sortData";
import "../styles/home.css";
import { sanitizeBudget } from "../utils/HomeUtils";

function Home() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.carData);
  const filters = useSelector((state) => state.filterData);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const dataRef = useRef(data);
  const [isSorting, setIsSorting] = useState(false);
  const lastScrollY = useRef(0);

  // for the initial mount tracking 
  const isInitialMount = useRef(true);

  useEffect(() => {
    dispatch(fetchCity());
    dispatch(fetchMake());
  }, [dispatch]);

  // filters when url change initial mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);


    const rawSearch = window.location.search.toLowerCase();
    if (rawSearch.includes("=null") || rawSearch.includes("=undefined")) {
      isInitialMount.current = false;
      return;
    }

    const fuel = params.get("fuel")?.split(" ").filter(Boolean) || [];
    const budget = sanitizeBudget(params.get("budget"));
    const makeIds = params.get("car")?.split(" ").filter(Boolean) || [];
    const cityIds = params.get("city")?.split(" ").filter(Boolean) || [];
    const sortBy = params.get("sortBy"); 

    // Update known parameters set
    const knownParams = new Set(["fuel", "budget", "car", "city", "sortBy"]);
    const hasUnknownParams = Array.from(params.keys()).some(
      key => !knownParams.has(key)
    );

    // Dispatch to Redux
    if (fuel.length) dispatch(changeFuelType(fuel));
    if (budget && budget !== "") dispatch(changeBudget(budget));
    if (makeIds.length) dispatch(changeMakeId(makeIds));
    if (cityIds.length) dispatch(changeCity(cityIds));
    if (sortBy) dispatch(changeSortBy(sortBy)); 

    if (hasUnknownParams) {
      const cleanParams = new URLSearchParams();
      if (fuel.length) cleanParams.set("fuel", fuel.join(" "));
      if (budget && budget !== "") cleanParams.set("budget", budget);
      if (makeIds.length) cleanParams.set("car", makeIds.join(" "));
      if (cityIds.length) cleanParams.set("city", cityIds.join(" "));
      if (sortBy) cleanParams.set("sortBy", sortBy); // Keep sort in clean URL

      const newSearch = cleanParams.toString();
      const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    setTimeout(() => {
      isInitialMount.current = false;
      dispatch(fetchCars());
    }, 0);
  }, [dispatch]);

  // Updating the url when params change
  useEffect(() => {
    if (isInitialMount.current) return;

    const params = new URLSearchParams();

    if (filters.fuel?.length) params.set("fuel", filters.fuel.join(" "));
    if (filters.budget && filters.budget !== "") params.set("budget", filters.budget);
    if (filters.makeIds?.length) params.set("car", filters.makeIds.join(" "));
    if (filters.cityIds?.length) params.set("city", filters.cityIds.join(" "));
    if (filters.sortBy && filters.sortBy !== "") params.set("sortBy", filters.sortBy); // Sync sort to URL

    const newSearch = params.toString();
    const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;

    if (window.location.search !== `?${newSearch}`) {
      window.history.replaceState({}, '', newUrl);
    }
  }, [filters]);

  // useEffect(() => {
  //   if (isInitialMount.current) return;
  //   setIsSorting(true);
  //   const timer = setTimeout(() => {
  //     setIsSorting(false);
  //   }, 300); 
  //   return () => clearTimeout(timer);
  // }, [filters.sortBy]);


  // Fetch cars when filters change (but not during URL initialization)
  useEffect(() => {
    if (isInitialMount.current) return;
    dispatch(fetchCars());
  }, [dispatch, filters?.fuel, filters?.budget, filters?.makeIds, filters?.cityIds, filters?.sortBy]);

  useEffect(() => {
    const handleScroll = () => {
      const currentData = dataRef.current;
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;
      if (!isScrollingDown) {
        return;
      }
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 250;
      if (
        nearBottom &&
        currentData?.nextPageUrl &&
        currentData?.stocks?.length > 0 &&
        currentData?.stocks?.length < currentData?.totalCount &&
        !loading &&
        !currentData.isFetchingNext &&
        !isScrollingUp
      ) {
        setIsScrollingUp(true);

        // window.scrollTo({
        //   top: 0,
        //   behavior: "smooth"
        // });
        dispatch(fetchCars(currentData.nextPageUrl));
        setTimeout(() => {
          setIsScrollingUp(false);
        }, 500);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // const sortedStocks = useMemo(() => {
  //   return sortData(data?.stocks || [], filters.sortBy);
  // }, [data?.stocks, filters.sortBy]);

  const dataStocks = useMemo(() => {
    return data?.stocks || [];
  }, [data?.stocks]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.fuel?.length > 0 ||
      filters.makeIds?.length > 0 ||
      filters.cityIds?.length > 0 ||
      (filters.budget && filters.budget !== "")
    );
  }, [filters]);

  const showEmptyState = !loading && dataStocks.length === 0;

  return (
    <div className="grid">
      <div className="filter">
        <Filter />
      </div>

      <div className="main-content">
        {/* {sortedStocks.length > 0 && ( */}
        <div className="sort-container">
          <SortBy />
        </div>
        {/* )} */}

        {isScrollingUp && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loader-spinner"></div>
              <p>Loading more cars...</p>
            </div>
          </div>
        )}

        {(loading) && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loader-spinner"></div>
              <p>Loading cars...</p>
            </div>
          </div>
        )}

        {showEmptyState && (
          <div className="empty-state">
            <div className="empty-state-content">
              <div className="empty-state-icon">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="60" fill="#f5f5f5" />
                  <path d="M40 55C40 52.2386 42.2386 50 45 50H75C77.7614 50 80 52.2386 80 55V75C80 77.7614 77.7614 80 75 80H45C42.2386 80 40 77.7614 40 75V55Z" fill="#e0e0e0" />
                  <circle cx="52" cy="72" r="6" fill="#bdbdbd" />
                  <circle cx="68" cy="72" r="6" fill="#bdbdbd" />
                  <path d="M45 50L48 45H72L75 50" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" />
                  <rect x="48" y="58" width="24" height="8" rx="2" fill="#bdbdbd" />
                </svg>
              </div>

              <h2 className="empty-state-title">No Cars Found</h2>

              <p className="empty-state-description">
                {hasActiveFilters
                  ? "We couldn't find any cars matching your filters. Try adjusting your search criteria."
                  : "No cars are currently available. Please check back later."}
              </p>
            </div>
          </div>
        )}

        {dataStocks.length > 0 && (
          <div className={`car-list ${isScrollingUp ? 'loading' : ''}`}>
            {dataStocks.map((car) => (
              <Card key={car.profileId} data={car} emptystate={showEmptyState} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;