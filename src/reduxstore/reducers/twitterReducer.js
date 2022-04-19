/* eslint-disable */
import * as types from '../types';

const initialState = {
    twitterConfig: {},
    isConfigLoading: false,
    isConfigLoaded: false,
};

// export the post reducer
const twitterReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TWITTER_CONFIG:
            return {
                ...state,
                twitterConfig: action.payload,
                isConfigLoading: false,
                isConfigLoaded: true,
            };
        case types.TWITTER_CONFIG_LOADING:
            return {
                ...state,
                isConfigLoading: true,
                isConfigLoaded: false,
            };
        case types.UPDATE_TWITTER_CONFIG:
            return state;
        default:
            return state;
    }
};

export default twitterReducer;
