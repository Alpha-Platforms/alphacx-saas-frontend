/* eslint-disable */
import * as types from '../types';

const initialState = {
    livechatConfig: {},
    isConfigLoading: false,
    isConfigLoaded: false,
};

// export the post reducer
const livechatReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIVECHAT_CONFIG:
            return {
                ...state,
                livechatConfig: action.payload,
                isConfigLoading: false,
                isConfigLoaded: true,
            };
        case types.LIVECHAT_CONFIG_LOADING:
            return {
                ...state,
                isConfigLoading: true,
                isConfigLoaded: false,
            };
        case types.UPDATE_LIVECHAT_CONFIG:
            return state;
        default:
            return state;
    }
};

export default livechatReducer;
