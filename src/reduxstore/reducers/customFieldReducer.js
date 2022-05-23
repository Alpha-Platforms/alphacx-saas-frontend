/* eslint-disable */
import * as types from '../types';

const initialState = {
    customFields: [],
    isCustomFieldsLoading: false,
    isCustomFieldsLoaded: false,
};

// export the post reducer
const customFieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CUSTOM_FIELDS:
            return {
                ...state,
                customFields: action.payload,
                isCustomFieldsLoading: false,
                isCustomFieldsLoaded: true,
            };
        case types.CUSTOM_FIELDS_LOADING:
            return {
                ...state,
                isCustomFieldsLoading: true,
                isCustomFieldsLoaded: false,
            };
        default:
            return state;
    }
};

export default customFieldReducer;
