/* eslint-disable */
import * as types from '../types';

const initialState = {
    appSocket: null
};

// export the post reducer
const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_APP_SOCKET:
            return {
                ...state,
                appSocket: action.payload,
            };
        default:
            return state;
    }
};

export default tagReducer;
