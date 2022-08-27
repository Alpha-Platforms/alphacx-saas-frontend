/* eslint-disable default-param-last */
import * as types from '../types';

const initialState = {
    tenantInfo: null,
    tenantInfoLoading: true,
    tenantInfoLoaded: false,
    kbBrandKit: null,
    kbBrandKitLoading: false,
    kbBrandKitLoaded: false,
};

const tenantInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TENANT_INFO:
            return {
                ...state,
                tenantInfo: action.payload,
                tenantInfoLoading: false,
                tenantInfoLoaded: true,
            };
        case types.GET_KB_BRAND_KIT:
            return {
                ...state,
                kbBrandKit: action.payload,
                kbBrandKitLoading: false,
                kbBrandKitLoaded: true,
            };
        default:
            return state;
    }
};

export default tenantInfoReducer;
