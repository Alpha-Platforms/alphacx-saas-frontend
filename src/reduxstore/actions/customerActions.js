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
            payload: res.data && res.data.status === "success"
                ? res.data.data
                : {}
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// invalid redux action
export const getInstantSearchedCustomers = async (term) => {
    if (!navigator.onLine) {
        return;
    }
    const searchStr = term.replace(/\W+/gi, ' ').replace(/\s+/gi, '%20');
    try {
        const res = await axios.get(`${config.stagingBaseUrl}/users?role=Customer&per_page=50`, userTokenConfig(getState));
        return res?.data;
    } catch (err) {
        NotificationManager.error(err.response.data.error, 'Error');
        return err.response.data;
    }
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
            payload: (res.data && res.data.status === "success")
                ? res.data.data
                : {}
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
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
        NotificationManager.error(err.response.data.message, 'Error');
        return err.response.data;
    }
}

// valid redux action
export const getCurrentCustomer = (id) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }
    setCurrentCustomerLoading();
    const {customers} = getState().customer;

    let currentCustomer = customers.filter(customer => customer
        ?.id === id)[0];

    console.log("Current Customer", currentCustomer);

    if (getState().customer.currentCustomer
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
                payload: res.data && res.data.status === "success"
                    ? res.data.data
                    : null
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                    type: types.GET_CURRENT_CUSTOMER,
                    payload: null
                })
            });
    }
}

export const setCustomersLoading = () => {
    return {type: types.CUSTOMERS_LOADING}
}

export const setCurrentCustomerLoading = () => {
    return {type: types.CURRENT_CUSTOMER_LOADING}
}