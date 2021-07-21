import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';
import {NotificationManager} from 'react-notifications';

export const getCustomers = (currentPage) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return NotificationManager.error('Please check your internet', 'Opps!', 3000);
	}
	dispatch(setCustomersLoading());
	axios.get(`${config.stagingBaseUrl}/users?role=Customer&per_page=${config.customersPerPage}&page=${currentPage}`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_CUSTOMERS,
			payload: res.data ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addCustomer = (newCustomer) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newCustomer);

	axios.post(`${config.stagingBaseUrl}/api/customers/addnewcustomer`, body, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.ADD_CUSTOMER,
			payload: res.data
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}


export const setCustomersLoading = () => {
	return {
		type: types.CUSTOMERS_LOADING
	}
}