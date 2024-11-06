import { render, screen } from '@testing-library/react'; // Importing necessary functions from testing library
import App from './App'; // Importing the component to be tested (App)

test('renders learn react link', () => { // Defining a test case with a description of the test
  render(<App />); // Rendering the App component into the testing environment
  const linkElement = screen.getByText(/learn react/i); // Searching for the link with text "learn react" (case-insensitive)
  expect(linkElement).toBeInTheDocument(); // Asserting that the link is found in the document (i.e., it is rendered)
});
