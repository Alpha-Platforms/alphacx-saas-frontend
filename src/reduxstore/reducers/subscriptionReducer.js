/* eslint-disable default-param-last */
import * as types from '../types';

const initialState = {
    subscription: null,
    subscriptionLoading: true,
    subscriptionLoaded: false,
};

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SUBSCRIPTION:
            return {
                ...state,
                subscription: action.payload,
                subscriptionLoading: false,
                subscriptionLoaded: true,
            };
        default:
            return state;
    }
};

export default subscriptionReducer;
