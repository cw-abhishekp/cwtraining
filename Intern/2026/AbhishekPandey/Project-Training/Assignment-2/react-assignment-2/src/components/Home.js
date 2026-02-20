import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchMake from "../redux/make/MakeActions";
import fetchCity from "../redux/city/CityActions";
import fetchCars from "../redux/car/CarActions";
import { changeFuelType, changeMakeId, changeCity, changeBudget } from "../redux/filter/FilterActions";
import Card from "./Card_Carousel";
import Filter from "./Filter";
import SortBy from "./Sort/SortBy";
import sortData from "./Sort/SortData";
import "../styles/home.css";
import { sanitizeBudget } from "../utils/HomeUtils";

function Home() {
  const dispatch = useDispatch();
  const filt = useRef([])
  const { data, loading } = useSelector((state) => state.carData);
  const filters = useSelector((state) => state.filterData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const isInitialLoad = useRef(true);
  const dataRef = useRef(data);
  const hasInitializedFromURL = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

 

  // Initialize filters from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const fuel = params.get("fuel")?.split("+").filter(Boolean) || [];
    const budget = sanitizeBudget(params.get("budget"));
    const makeIds = params.get("car")?.split("+").map(Number).filter(Boolean) || [];
    const cityIds = params.get("city")?.split("+").map(Number).filter(Boolean) || [];

    if (fuel.length) dispatch(changeFuelType(fuel));
    if (budget && budget !== "0-50") dispatch(changeBudget(budget));
    if (makeIds.length) dispatch(changeMakeId(makeIds));
    if (cityIds.length) dispatch(changeCity(cityIds));

    hasInitializedFromURL.current = true;
    isInitialLoad.current = false;

    // const handlePopState = () => {
    //   window.location.reload();
    // };

    // window.addEventListener('popstate', handlePopState);
    // return () => window.removeEventListener('popstate', handlePopState);
  }, [dispatch]);

  // Update URL when filters change
  useEffect(() => {
    if (isInitialLoad.current) return;

    const params = new URLSearchParams();

    if (filters.fuel?.length) params.set("fuel", filters.fuel.join("+"));
    if (filters.budget && filters.budget !== "0-50") params.set("budget", filters.budget);
    if (filters.makeIds?.length) params.set("car", filters.makeIds.join("+"));
    if (filters.cityIds?.length) params.set("city", filters.cityIds.join("+"));

    const newSearch = params.toString();
    const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;

    if (window.location.search !== `?${newSearch}`) {
      window.history.replaceState({}, '', newUrl);
    }
  }, [filters]);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchMake());
    dispatch(fetchCity());
  }, []);

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
        !isLoadingMore
      ) {
        setIsLoadingMore(true);
        setIsScrollingUp(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        setTimeout(() => {
          dispatch(fetchCars(currentData.nextPageUrl));
          setIsScrollingUp(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, isLoadingMore, dispatch]);

   useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      window.location.href = '/';
    }
  }, []);


  useEffect(() => {
    if (!loading && !data?.isFetchingNext && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [loading, data?.isFetchingNext, isLoadingMore]);

  const sortedStocks = useMemo(() => {
    return sortData(data?.stocks || [], filters.sortBy);
  }, [data?.stocks, filters.sortBy]);


  const hasActiveFilters = useMemo(() => {
    let arr = [];
    (filters.fuel?.length > 0) ? arr.push(true) : arr.push(false);
    (filters.makeIds?.length > 0) ? arr.push(true) : arr.push(false);
    (filters.cityIds?.length > 0) ? arr.push(true) : arr.push(false);
    (filters.budget && filters.budget !== "0-50") ? arr.push(true) : arr.push(false);
    console.log(filt);
    filt.current =arr;
    console.log(filt);
    return (
      filters.fuel?.length > 0 ||
      filters.makeIds?.length > 0 ||
      filters.cityIds?.length > 0 ||
      (filters.budget && filters.budget !== "0-50")
    );
  }, [filters]);



  //  Check if we should show empty state
  const showEmptyState = !loading && sortedStocks.length === 0;

  return (
    <div className="grid">
      {/* Left Sidebar - Sticky Filter */}
      <div className="filter">
        <Filter />
      </div>

      {/* Right Content */}
      <div className="main-content">
        {/* Sort Container - Only show when there are results */}
        {sortedStocks.length > 0 && (
          <div className="sort-container">
            <SortBy array = {filt.current}/>
          </div>
        )}

        {/* Loading Overlay for Scroll Up */}
        {isScrollingUp && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loader-spinner"></div>
              <p>Loading more cars...</p>
            </div>
          </div>
        )}

        {/* Initial Loading Overlay */}
        {loading && !data?.stocks?.length && (
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

        {/* Car List */}
        {sortedStocks.length > 0 && (
          <div className={`car-list ${isLoadingMore || isScrollingUp ? 'loading' : ''}`}>
            {sortedStocks.map((car) => (
              <Card key={car.profileId} data={car} />
            ))}
          </div>
        )}

        {/* Bottom Loading Indicator */}
        {data?.isFetchingNext && !isLoadingMore && !isScrollingUp && (
          <div className="scroll-loader">
            <span className="spinner" /> Loading more cars...
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;