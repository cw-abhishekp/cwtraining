import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import fetchCars from "../redux/car/CarActions";
import axios from "axios";

// Mock axios
jest.mock("axios");

const mockStore = configureStore([thunk]);

describe("fetchCars thunk", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetchCars dispatches request and success", async () => {
    // Mock axios response
    const mockData = {
      stocks: [
        { makeId: 101, makeName: "X5" },
        { makeId: 102, makeName: "Creta" },
      ],
    };

    axios.get.mockResolvedValue({ data: mockData });

    const store = mockStore({
      carData: { isFetchingNext: false },
      filterData: {
        fuel: [],
        budget: "",
        makeIds: [],
        cityIds: [],
      },
    });

    await store.dispatch(fetchCars());

    const actions = store.getActions();

    expect(actions[0].type).toBe("FETCH_CARS_REQUEST");
    expect(actions[1].type).toBe("FETCH_CARS_SUCCESS");
    expect(actions[1].payload).toEqual(mockData);
  });
});