const tokenKey = 'api_token';

export const getToken = () => localStorage.getItem(tokenKey);

export const setToken = (token) => localStorage.setItem(tokenKey, token);

export const removeToken = () => localStorage.removeItem(tokenKey);
export const setLocalItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getLocalItem = (key) => localStorage.getItem(key);

export default {
    setToken,
    removeToken,
    getToken,
    setLocalItem,
    getLocalItem,
};
