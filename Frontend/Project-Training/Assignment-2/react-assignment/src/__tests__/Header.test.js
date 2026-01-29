import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("Header Test", () => {
  render(<Header />);
  const button = screen.getByText(/NEW CARS/i);
  expect(button).toBeInTheDocument();
});