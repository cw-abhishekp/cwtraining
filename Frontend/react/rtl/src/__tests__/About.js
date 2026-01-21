import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('About', () => {
  render(<About />);
  const linkElement = screen.getByText(/About/i);
  expect(linkElement).toBeInTheDocument();
});   
  