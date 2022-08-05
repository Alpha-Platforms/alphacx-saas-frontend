/* eslint-disable */
import * as types from '../types';

const initialState = {
    helpfulArticles: [],
};

// export the post reducer
const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_HELPFUL_ARTICLE:
            return {
                ...state,
                helpfulArticles: state.helpfulArticles.indexOf(action.payload) === -1 ? [...state.helpfulArticles, action.payload] : state.helpfulArticles,
            };
        default:
            return state;
    }
};

export default tagReducer;
