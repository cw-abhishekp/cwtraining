import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import fetchCity from "../redux/city/CityActions";

const mockStore = configureStore([thunk]);

describe("fetchCity thunk", () => {
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,   
      json: () => Promise.resolve(["Mumbai", "Delhi", "Bangalore"]),
    })
  );
});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchCity dispatches request and success", async () => {
    const store = mockStore({});

    await store.dispatch(fetchCity());

    const actions = store.getActions();

    expect(actions[0].type).toBe("FETCH_CITY_REQUEST");
    expect(actions[1].type).toBe("FETCH_CITY_SUCCESS");
    expect(actions[1].payload).toEqual(["Mumbai", "Delhi", "Bangalore"]);
  });
});