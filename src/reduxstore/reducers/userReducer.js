/* eslint-disable */
import * as types from '../types';

const initialState = {
    users: [],
    meta: null,
    isUsersLoading: false, // will be true when fetching data and back to false when the fetch is done
    isUsersLoaded: false,
};

// export the post reducer
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload.users,
                meta: action.payload.meta,
                isUsersLoading: false,
                isUsersLoaded: true,
                isUsersFullyLoaded: true,
            };
        case types.USERS_LOADING:
            return {
                ...state,
                isUsersLoading: true,
                isUsersLoaded: false,
            };
        case types.RESET_USER_CREATED:
            return {
                ...state,
                isUserCreated: false,
            };
        default:
            return state;
    }
};

export default userReducer;
