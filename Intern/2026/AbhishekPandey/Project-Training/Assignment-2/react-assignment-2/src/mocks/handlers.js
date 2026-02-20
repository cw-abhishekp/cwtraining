import { rest } from "msw";

export const handlers = [
  // fetchCars
  rest.get("http://localhost:5000/api/stocks", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cars: [{ id: 1, name: "Swift" }],
      })
    );
  }),

  // fetchMake
  rest.get("http://localhost:5000/api/v2/makes/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 1, name: "BMW" }])
    );
  }),

  // fetchCity
  rest.get("http://localhost:5000/api/cities", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 1, name: "Mumbai" }])
    );
  }),
];
