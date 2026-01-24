import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import fetchMake from "../redux/make/MakeActions";

const mockStore = configureStore([thunk]);

describe("fetchMake thunk", () => {
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,  
      json: () =>
        Promise.resolve([
          { makeId: 1, makeName: "BMW" },
          { makeId: 2, makeName: "Audi" },
        ]),
    })
  );
});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchMake dispatches request and success", async () => {
    const store = mockStore({});

    await store.dispatch(fetchMake());

    const actions = store.getActions();

    expect(actions[0].type).toBe("FETCH_MAKE_ID_REQUEST");
    expect(actions[1].type).toBe("FETCH_MAKE_ID_SUCCESS");
    expect(actions[1].payload).toEqual([
      { makeId: 1, makeName: "BMW" },
      { makeId: 2, makeName: "Audi" },
    ]);
  });
});