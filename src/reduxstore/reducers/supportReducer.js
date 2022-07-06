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
            justCreated: false
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
    supportModalActive: false,
    activeSupportTicket: null,
};

const supportReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_SUPPORT_TICKET:
            return {
                ...state,
                supportTickets: [action.payload, ...state.supportTickets],
            };
        case types.SET_SUPPORT_MODAL_ACTIVE:
            return {
                ...state,
                supportModalActive: action.payload,
            };
        default:
            return state;
    }
};

export default supportReducer;
