import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';
import {userTokenConfig} from '../../helper';
import store from '../store';
import {NotificationManager} from 'react-notifications';

const {getState} = store;

// redux action
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
export const addCustomer = async (newCustomer) => {
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

export const setCustomersLoading = () => {
    return {type: types.CUSTOMERS_LOADING}
}