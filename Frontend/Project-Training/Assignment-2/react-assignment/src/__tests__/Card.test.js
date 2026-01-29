import { render, screen } from "@testing-library/react";
import Card from "../components/Card";

test("Card Test", () => {
  const mockData = {
    stockImages: [],
  };
  render(<Card data={mockData} />);
  const button = screen.getByText(/get seller details/i);
  expect(button).toBeInTheDocument();
});