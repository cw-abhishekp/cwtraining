import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// here we can test inside the it also it is same working as the test 
it('renders learn react link2', () => {
  render(<App />);
  // this is getting th element from the screen
  const linkElement = screen.getByText(/learn react/i);
  // this is used to check weather the element present in the document or not
  expect(linkElement).toBeInTheDocument();
});

// HERE WE ARE BINDING SEVERAL TEST CASES INSIDE THE DESCRIBE SO THAT WE CAN GIVE COMMON NAME AND DEPENDING UPON THAT WE CAN CALL
describe(('LOGIN BUTTON'),()=>{
  test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// here we can test inside the it also it is same working as the test 
it('renders learn react link2', () => {
  render(<App />);
  // this is getting th element from the screen
  const linkElement = screen.getByText(/learn react/i);
  // this is used to check weather the element present in the document or not
  expect(linkElement).toBeInTheDocument();
});

})

