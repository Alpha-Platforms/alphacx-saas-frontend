/* eslint-disable default-param-last */
import * as types from '../types';

const initialState = {
    tenantInfo: null,
    tenantInfoLoading: true,
    tenantInfoLoaded: false,
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
        default:
            return state;
    }
};

export default tenantInfoReducer;
