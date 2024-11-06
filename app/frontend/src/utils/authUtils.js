// Constant representing the session expiry time (1 hour in milliseconds)
export const LOGIN_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

// Function to check if the session has expired
export const isSessionExpired = () => {
    // Retrieve the 'loginData' from sessionStorage
    const loginData = sessionStorage.getItem('loginData');
    
    // If no login data exists, consider the session expired
    if (!loginData) return true;

    // Parse the 'loginData' to extract the expiration time
    const { expiration } = JSON.parse(loginData);
    
    // Get the current time in milliseconds
    const now = new Date().getTime();
  
    // Compare the current time with the stored expiration time
    return now > expiration; // If the current time is greater than expiration, the session is expired
};