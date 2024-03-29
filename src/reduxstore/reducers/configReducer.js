/* eslint-disable */
import * as types from '../types';

const initialState = {
    configs: null,
    isConfigsLoading: false, // will be true when fetching data and back to false when the fetch is done
    isConfigsLoaded: false,
};

// export the post reducer
const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CONFIGS:
            return {
                ...state,
                configs: action.payload,
                isConfigsLoading: false,
                isConfigsLoaded: true,
            };
        case types.CONFIGS_LOADING:
            return {
                ...state,
                isConfigsLoading: true,
                isConfigsLoaded: false,
            };
        case types.UPDATE_TWITTER_CONFIG:
            return {
                ...state,
                configs: {
                    ...state.configs,
                    twitter_config: {
                        ...state.configs?.twitter_config,
                        ...action.payload,
                    },
                },
            };
        default:
            return state;
    }
};

export default configReducer;
