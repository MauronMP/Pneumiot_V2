// Importing the useState hook from React to manage state within the custom hook
import { useState } from 'react';

// Custom hook to toggle a boolean state
const useToggle = (initialState = false) => {
  // State variable to track the current state (true or false)
  const [state, setState] = useState(initialState);

  // Function to toggle the current state between true and false
  const toggle = () => setState(!state);

  // Return the current state and the toggle function as an array
  return [state, toggle];
};

// Export the custom hook so it can be used in other components
export default useToggle;