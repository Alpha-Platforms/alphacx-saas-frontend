import * as types from '../types';
import {config} from '../../config/keys';

const initialState = {
    tenantToken: localStorage.getItem(config.localStorageTenantTokenId),
    id: '',
    domain: '',
    isTenantLoading: false,
    isTenantAuthenticated: false,
    isAttemptingTenantLogin: false,
    isTenantLoginFailed: false,
    isTenantLoaded: false
}

const tenantAuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.TENANT_LOADING:
            return {
                ...state,
                isTenantLoading: true
            };
        case types.TENANT_LOADED:
            return {
                ...state,
                isTenantAuthenticated: true,
                isTenantLoading: false,
                isTenantLoaded: true,
                id: action.payload.id,
                domain: action.payload.domain
            };
        case types.TENANT_LOGIN_SUCCESS:
        case types.TENANT_REGISTER_SUCCESS:
                localStorage.setItem(config.localStorageTenantTokenId, action.payload.token);
            return {
                ...state,
                tenantToken: action.payload.token,
                id: action.payload.id,
                domain: action.payload.domain,
                isTenantAuthenticated: true,
                isTenantLoading: false,
                isAttemptingLogin: false,
                isTenantLoginFailed: false
            };
        case types.TENANT_AUTH_ERROR:
        case types.TENANT_LOGIN_FAIL:
        case types.TENANT_LOGOUT_SUCCESS:
        case types.TENANT_REGISTER_FAIL:
                localStorage.removeItem(config.localStorageTenantTokenId);
            return {
                ...state,
                tenantToken: null,
                id: '',
                domain: '',
                isTenantAuthenticated: false,
                isTenantLoading: false,
                isAttemptingLogin: false,
                isTenantLoaded: true
            };
        default:
            return state;
    }
}

export default tenantAuthReducer;