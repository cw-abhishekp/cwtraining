import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('Blog', () => {
  render(<Blog />);
  const linkElement = screen.getByText(/Blog/i);
  expect(linkElement).toBeInTheDocument();
});
