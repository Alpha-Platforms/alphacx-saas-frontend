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
    supportLoading: false,
    supportLoaded: false,
};

const supportReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default supportReducer;
