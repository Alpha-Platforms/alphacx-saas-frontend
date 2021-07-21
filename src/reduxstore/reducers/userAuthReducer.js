import * as types from '../types';
import {config} from '../../config/keys';

const initialState = {
    userToken: localStorage.getItem(config.localStorageUserTokenId),
    type: '',
    refreshToken: '',
    user: null,
    isUserLoading: false,
    isUserAuthenticated: false,
    isAttemptingUserLogin: false,
    isUserLoginFailed: false,
    isUserLoaded: false
}

const userAuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.USER_LOADING:
            return {
                ...state,
                isUserLoading: true
            };
        case types.USER_LOADED:
            return {
                ...state,
                isUserAuthenticated: true,
                isUserLoading: false,
                isUserLoaded: true,
                type: action.payload.type,
                refreshToken: action.payload.refreshToken,
                user: action.payload.user
            };
        case types.USER_LOGIN_SUCCESS:
        case types.USER_REGISTER_SUCCESS:
                localStorage.setItem(config.localStorageUserTokenId, action.payload.token);
            return {
                ...state,
                userToken: action.payload.token,
                type: action.payload.type,
                refreshToken: action.payload.refreshToken,
                user: action.payload.user,
                isUserAuthenticated: true,
                isUserLoading: false,
                isAttemptingLogin: false,
                isUserLoginFailed: false
            };
        case types.USER_AUTH_ERROR:
        case types.USER_LOGIN_FAIL:
        case types.USER_LOGOUT_SUCCESS:
        case types.USER_REGISTER_FAIL:
                localStorage.removeItem(config.localStorageUserTokenId);
            return {
                ...state,
                userToken: null,
                type: '',
                refreshToken: '',
                user: null,
                isUserAuthenticated: false,
                isUserLoading: false,
                isAttemptingLogin: false,
                isUserLoaded: true
            };
        default:
            return state;
    }
}

export default userAuthReducer;