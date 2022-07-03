/* eslint-disable default-param-last */
import * as types from '../types';

/* 
supportTickets: [
    {
        customer: {
            customer: {},
            ticket: {},
            token: {},
            assignee: {},
            loading: '', // loading | loaded | error
            isAuthenticated: false,
        },
        chat: {
            chat: [],
            loading: '', // loading | loaded | error
        }
    }
]
*/

const initialState = {
    supportTickets: [],
};

const supportReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_SUPPORT_TICKET:
            return {
                ...state,
                supporTickets: [action.payload, ...state.supportTickets],
            };
        default:
            return state;
    }
};

export default supportReducer;
