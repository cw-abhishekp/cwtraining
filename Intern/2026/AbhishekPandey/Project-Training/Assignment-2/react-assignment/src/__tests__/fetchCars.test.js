import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import fetchCars from "../redux/car/CarActions";
import { FETCH_CARS_FAILURE, FETCH_CARS_REQUEST, FETCH_CARS_SUCCESS } from "../redux/car/CarTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("fetchCars thunk", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("dispatches request and success when fetch is successful", async () => {
    const mockData = {
      stocks: [
        {
          profileId: 9736,
          makeId: 10,
          makeName: "Maruti Suzuki",
          cityId: 1,
          cityName: "Mumbai",
          versionName: "Alpha 1.2",
          kmNumeric: 10000,
          fuel: "",
          makeYear: 2021,
          modelName: "Baleno",
          priceNumeric: 200000,
          emiPrice: 3599,
          stockImages: [],
          price: "2 Lakh",
          emiText: "EMI Starts at ₹3,599",
          km: "10,000",
          carName: "2021 Maruti Suzuki Baleno Alpha 1.2",
          isValueForMoney: false
        },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const initialState = {
      carData: {
        isFetchingNext: false
      },
      filterData: {
        fuel: [],
        makeIds: [],
        cityIds: [],
        budget: null,
        sortBy: ""
      }
    };

    const store = mockStore(initialState);

    await store.dispatch(fetchCars());

    const actions = store.getActions();

    expect(actions[0].type).toBe(FETCH_CARS_REQUEST);
    expect(actions[1].type).toBe(FETCH_CARS_SUCCESS);
    expect(actions[1].payload).toEqual(mockData);
  });

  it("dispatches request and failure when fetch fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    const initialState = {
      carData: { isFetchingNext: false },
      filterData: { fuel: [], makeIds: [], cityIds: [] }
    };

    const store = mockStore(initialState);

    await store.dispatch(fetchCars());

    const actions = store.getActions();

    expect(actions[0].type).toBe(FETCH_CARS_REQUEST);
    expect(actions[1].type).toBe(FETCH_CARS_FAILURE);
    expect(actions[1].payload).toContain("Fetch failed");
  }); 
});