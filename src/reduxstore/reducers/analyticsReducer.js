/* eslint-disable */
import * as types from '../types';

const initialState = {
    analytics: [],
    newAnalytics: {},
    isAnalyticsLoading: false, // will be true when fetching data and back to false when the fetch is done
    isAnalyticsLoaded: false,
    isNewAnayticsLoaded: false,
};

// export the post reducer
const analyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ANALYTICS:
            return {
                ...state,
                analytics: action.payload,
                isAnalyticsLoading: false,
                isAnalyticsLoaded: true,
            };
        case types.GET_NEW_ANALYTICS:
            return {
                ...state,
                newAnalytics: action.payload,
                isAnalyticsLoaded: true,
            };
        case types.ADD_ANALYTICS:
            return state;
        case types.ANALYTICS_LOADING:
            return {
                ...state,
                isAnalyticsLoading: true,
                isAnalyticsLoaded: false,
            };
        default:
            return state;
    }
};

export default analyticsReducer;
