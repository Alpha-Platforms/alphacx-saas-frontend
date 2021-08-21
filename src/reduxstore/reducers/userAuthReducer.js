import * as types from '../types';

const initialState = {
    // userToken: localStorage.getItem(config.localStorageUserTokenId),
    userToken: JSON.parse(localStorage.getItem('user'))?.token,
    user: null,
    isUserLoading: true,
    isUserAuthenticated: false
}

const userAuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.USER_LOADED:
            return {
                ...state,
                isUserAuthenticated: true,
                isUserLoading: false,
                isUserLoaded: true,
                user: action.payload?.user,
                userToken: action.payload?.token
            };
        default:
            return state;
    }
}

export default userAuthReducer;