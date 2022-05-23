/* eslint-disable */
import * as types from '../types';

const initialState = {
    customFields: [],
    isCustomFieldsLoading: true,
    isCustomFieldsLoaded: false,
};

// export the post reducer
const customFieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CUSTOM_FIELDS:
            return {
                ...state,
                customFields: action.payload,
                isCustomFieldsLoaded: true,
                isCustomFieldsLoading: false,
            };
        case types.CUSTOM_FIELDS_LOADING:
            return {
                ...state,
                isCustomFieldsLoading: true,
                isCustomFieldsLoaded: false,
            };
        case types.ADD_CUSTOM_FIELD:
            return {
                ...state,
                customFields: [...state.customFields, action.payload],
            };
        default:
            return state;
    }
};

export default customFieldReducer;
