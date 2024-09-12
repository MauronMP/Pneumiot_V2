// src/utils/authUtils.js

export const LOGIN_EXPIRY_TIME = 60 * 60 * 1000; // 1 hora en milisegundos

export const isSessionExpired = () => {
    const loginData = sessionStorage.getItem('loginData');
    if (!loginData) return true;
  
    const { expiration } = JSON.parse(loginData);
    const now = new Date().getTime();
  
    return now > expiration;
  };
  