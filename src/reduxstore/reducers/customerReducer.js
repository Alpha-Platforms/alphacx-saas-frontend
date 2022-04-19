/* eslint-disable */
import * as types from '../types';

const initialState = {
    customers: [],
    meta: null,
    isCustomersLoading: false, // will be true when fetching data and back to false when the fetch is done
    isCustomersLoaded: false,
    currentCustomer: null,
    currentCustomerTickets: null,
    currentCustomerTicketsMeta: null,
    isCurrentCustomerLoading: false,
    isCurrentCustomerLoaded: false,
    isCurrentCustomersTicketLoading: false,
    isCurrentCustomersTicketLoaded: false,
};

// export the post reducer
const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload.users || [],
                meta: action.payload.meta,
                isCustomersLoading: false,
                isCustomersLoaded: true,
            };
        case types.CUSTOMERS_LOADING:
            return {
                ...state,
                isCustomersLoading: true,
                isCustomersLoaded: false,
            };
        case types.ADD_CUSTOMER:
            return {
                ...state,
                customers: action.payload,
            };
        case types.CURRENT_CUSTOMER_LOADING:
            return {
                ...state,
                isCurrentCustomerLoading: true,
                isCurrentCustomerLoaded: false,
            };
        case types.GET_CURRENT_CUSTOMER:
            return {
                ...state,
                currentCustomer: action.payload,
                isCurrentCustomerLoading: false,
                isCurrentCustomerLoaded: true,
            };
        case types.GET_CURRENT_CUSTOMER_TICKETS:
            return {
                ...state,
                currentCustomerTickets: action.payload?.tickets,
                currentCustomerTicketsMeta: action.payload?.meta,
                isCurrentCustomerTicketsLoading: false,
                isCurrentCustomerTicketsLoaded: true,
            };
        case types.CURRENT_CUSTOMER_TICKETS_LOADING:
            return {
                ...state,
                isCurrentCustomerTicketsLoading: true,
                isCurrentCustomerTicketsLoaded: false,
            };
        default:
            return state;
    }
};

export default customerReducer;
