import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';
import {userTokenConfig} from '../../helper';
import store from '../store';
import {NotificationManager} from 'react-notifications';

const {getState} = store;

// valid redux action
export const getCustomers = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setCustomersLoading());
    axios
        .get(`${config.stagingBaseUrl}/users?role=Customer`, userTokenConfig(getState))
        .then(res => dispatch({
            type: types.GET_CUSTOMERS,
            payload: res.data && res.data
                ?.status === "success"
                    ? res.data.data
                    : {}
        }))
        .catch(err => dispatch(returnErrors(err
            ?.response
                ?.data, err
            ?.response
                ?.status)));
}

// invalid redux action
export const getInstantSearchedCustomers = async(term) => {
    if (!navigator.onLine) {
        return;
    }
    const searchStr = term
        .replace(/\W+/gi, ' ')
        .replace(/\s+/gi, '%20');
    try {
        const res = await axios.get(`${config.stagingBaseUrl}/users?role=Customer&per_page=50&search=${searchStr}`, userTokenConfig(getState));
        return res
            ?.data;
    } catch (err) {
        // NotificationManager.error(err?.response?.data.error, 'Error');
        console.log('Error', err
            ?.response
                ?.data.error);
        return err
            ?.response
                ?.data;
    }
}

export const addNewCustomer = (newCust, pageSize = 50) => (dispatch, getState) => {
    console.log('Calling from addNewCustomer');
    const existingCust = JSON.parse(JSON.stringify(getState()?.customer?.customers || []));

    if (existingCust.length >= pageSize) existingCust.pop();
    existingCust.unshift(newCust)

    newCust && dispatch({
        type: types.ADD_CUSTOMER,
        payload: existingCust
    });
}

// valid redux action
export const getPaginatedCustomers = (itemsPerPage, currentPage) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setCustomersLoading());
    axios
        .get(`${config.stagingBaseUrl}/users?role=Customer&per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
        .then(res => dispatch({
            type: types.GET_CUSTOMERS,
            payload: (res.data && res.data
                ?.status === "success")
                ? res.data.data
                : {}
        }))
        .catch(err => {
            dispatch({
                type: types.GET_CUSTOMERS,
                payload: {
                    meta: {
                        totalItems:"0",
                        itemsPerPage: 50,
                        currentPage: 1,
                        totalPages: 0
                    }
                }
            });
            dispatch(returnErrors(err
                ?.response
                    ?.data, err.response
                ?.status))
        });
}

// invalid redux action
export const addCustomer = async(newCustomer) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }

    //Request body
    const body = JSON.stringify(newCustomer);

    try {
        const res = await axios.post(`${config.stagingBaseUrl}/customer`, body, userTokenConfig(getState));
        return res.data;
    } catch (err) {
        NotificationManager.error(err
            ?.response
                ?.data.message, 'Error');
        return err
            ?.response
                ?.data;
    }
}

// valid redux action
export const updateCustomer = (customerId, newCustomer, successCallback, failureCallback) => (dispatch, getState) => {

    //Request body
    const body = JSON.stringify(newCustomer);

    axios
        .patch(`${config.stagingBaseUrl}/customer/${customerId}`, body, userTokenConfig(getState))
        .then(res => {
            successCallback && successCallback();
        })
        .catch(err => {
            dispatch(returnErrors(err.response
                ?.data, err.response
                ?.status))
            failureCallback && failureCallback();
        });

}

// valid redux action
export const getCurrentCustomer = (id, refetchCust) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }
    setCurrentCustomerLoading();
    const {customers} = getState().customer;

    let currentCustomer = customers.filter(customer => customer?.id === id)[0];

    // console.log("Current Customer", currentCustomer);

    if (refetchCust) {
        axios
            .get(`${config.stagingBaseUrl}/users/${id}`, userTokenConfig(getState))
            .then(res => dispatch({
                type: types.GET_CURRENT_CUSTOMER,
                payload: res.data && res.data
                    ?.status === "success"
                        ? res.data.data
                        : null
            }))
            .catch(err => {
                dispatch(returnErrors(err
                    ?.response
                        ?.data, err
                    ?.response
                        ?.status))
                dispatch({type: types.GET_CURRENT_CUSTOMER, payload: null})
            });
    } else if (getState().customer.currentCustomer
        ?.id === id) {
        dispatch({
            type: types.GET_CURRENT_CUSTOMER,
            payload: getState().customer.currentCustomer
        })
    } else if (currentCustomer) {
        dispatch({type: types.GET_CURRENT_CUSTOMER, payload: currentCustomer})
    } else {
        axios
            .get(`${config.stagingBaseUrl}/users/${id}`, userTokenConfig(getState))
            .then(res => dispatch({
                type: types.GET_CURRENT_CUSTOMER,
                payload: res.data && res.data
                    ?.status === "success"
                        ? res.data.data
                        : null
            }))
            .catch(err => {
                dispatch(returnErrors(err
                    ?.response
                        ?.data, err
                    ?.response
                        ?.status))
                dispatch({type: types.GET_CURRENT_CUSTOMER, payload: null})
            });
    }
}

// valid redux action
export const getPaginatedCurrentCustomerTickets = (itemsPerPage, currentPage, customerId) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return console.error("Network error!");
    }
    dispatch(setCurrentCustomerTicketsLoading());
    axios
        .get(`${config.stagingBaseUrl}/customer/${customerId}/tickets?per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
        .then(res => dispatch({
            type: types.GET_CURRENT_CUSTOMER_TICKETS,
            payload: (res.data && res.data
                ?.status === "success")
                ? res.data.data
                : {}
        }))
        .catch(err => dispatch(returnErrors(err.response
            ?.data, err.response
            ?.status)));
}

// invalid redux action
export const getCustTickets = async(itemsPerPage, currentPage, customerId, statusId) => {
    if (!navigator.onLine) {
        return console.error("Network error!");
    }
    const endpoint = `${config.stagingBaseUrl}/customer/${customerId}/tickets?per_page=${itemsPerPage}&page=${currentPage}${statusId ? `&status=${statusId}` : ''}`;
    try {
        const res = await axios.get(endpoint, userTokenConfig(getState));
        if (res.data && res.data
            ?.status === "success") {
            return res.data
                ?.data
        }
        return false
    } catch (err) {
        NotificationManager.error(err
            ?.response
                ?.data.message, 'Error');
        console.error('Customer Ticket Error', err);
        return false;
    }
}

// invalid redux action
export const createCustTicket = async(newTicket) => {
    if (!navigator.onLine) {
        return console.error("Network error!");
    }
    const endpoint = `${config.stagingBaseUrl}/customer/ticket`;
    console.log('newTicket body: ', newTicket);
    try {
        const res = await axios.post(endpoint, newTicket, userTokenConfig(getState));
        console.log('Cust ticket creation pass Res: ', res);
        if (res.data && res.data
            ?.status === "success") {
            return res.data
                ?.data
        }
        return false
    } catch (err) {
        NotificationManager.error(err
            ?.response
                ?.data.message, 'Error');
        console.log('Customer Ticket Error', err);
        return false;
    }
}

/* 
https://kustormar-staging.herokuapp.com/v1/sla/dabb9095-1a5a-4102-8fb9-4ecb0af1d87d
*/


export const setCustomersLoading = () => {
    return {type: types.CUSTOMERS_LOADING}
}

export const setCurrentCustomerLoading = () => {
    return {type: types.CURRENT_CUSTOMER_LOADING}
}

export const setCurrentCustomerTicketsLoading = () => {
    return {type: types.CURRENT_CUSTOMER_TICKETS_LOADING}
}