import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import SortBy from "../components/Sort/SortBy"
import { changeSortBy } from "../redux/filter/FilterActions";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../redux/filter/FilterActions", () => ({
  changeSortBy: jest.fn(),
}));

test("dispatches changeSortBy on select change", () => {
  const dispatchMock = jest.fn();

  useDispatch.mockReturnValue(dispatchMock);
  useSelector.mockImplementation((cb) =>
    cb({ filterData: { sortBy: "Best Match" } })
  );

  render(<SortBy />);

  const select = screen.getByRole("combobox");

  fireEvent.change(select, {
    target: { value: "Price - Low to High" },
  });

  expect(changeSortBy).toHaveBeenCalledWith("Price - Low to High");
  expect(dispatchMock).toHaveBeenCalled();
});
