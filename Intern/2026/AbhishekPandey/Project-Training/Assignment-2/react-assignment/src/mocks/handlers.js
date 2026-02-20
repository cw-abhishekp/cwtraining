import { rest } from "msw";

export const handlers = [
  // fetchCars
  rest.get("http://localhost:5000/api/v1/stocks", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cars: [{ id: 1, name: "Swift" }],
      })
    );
  }),

  // fetchMake
  rest.get("http://localhost:5000/api/v1/make", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 1, name: "BMW" }])
    );
  }),

  // fetchCity
  rest.get("http://localhost:5000/api/v1/cities", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 1, name: "Mumbai" }])
    );
  }),
];
