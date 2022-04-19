/* eslint-disable */
import * as types from '../types';

const initialState = {
    message: {},
    status: '',
    id: '',
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ERRORS:
            return {
                message: action.payload.message,
                status: action.payload.status,
                id: action.payload.id,
            };

        case types.CLEAR_ERRORS:
            return {
                message: {},
                status: '',
                id: '',
            };

        default:
            return state;
    }
};

export default errorReducer;
