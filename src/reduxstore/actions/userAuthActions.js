/* eslint-disable */
import * as types from '../types';

export const loadUser = (user) => {
    return { type: types.USER_LOADED, payload: user };
};

// function to return userToken config
export const tokenConfig = (getState) => {
    // get userToken from local storage
    const { userToken } = getState().auth;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If userToken, add to headers
    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
};
