/* eslint-disable */
import * as types from '../types';

// return errors
export const returnErrors = (message, status, id = '') => {
    return {
        type: types.GET_ERRORS,
        payload: { message, status, id },
    };
};

// clear errors
export const clearErrors = () => {
    return {
        type: types.CLEAR_ERRORS,
    };
};
