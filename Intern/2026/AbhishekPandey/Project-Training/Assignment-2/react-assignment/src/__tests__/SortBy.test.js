import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import SortBy from "../components/Sort/SortBy";
import { changeSortBy } from "../redux/Filter/FilterActions";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../redux/Filter/FilterActions", () => ({
  changeSortBy: jest.fn(),
}));

test("dispatches changeSortBy on select change", () => {
  const dispatchMock = jest.fn();
  useDispatch.mockReturnValue(dispatchMock);

  useSelector.mockImplementation((cb) =>
    cb({
      filterData: { sortBy: "Best Match" },
      makeData: { data: [{ id: 1, name: "BMW" }] },
      cityData: { data: [{ id: 1, name: "Mumbai" }] },
    })
  );

  render(<SortBy />);

  const select = screen.getByRole("combobox");
  fireEvent.change(select, { target: { value: "PriceAsc" } });

  expect(changeSortBy).toHaveBeenCalledWith("PriceAsc");
  expect(dispatchMock).toHaveBeenCalled();
});
