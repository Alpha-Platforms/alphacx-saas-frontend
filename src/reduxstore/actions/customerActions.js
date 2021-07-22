import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getCustomers = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setCustomersLoading());
	axios.get(`${config.stagingBaseUrl}/users`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_CUSTOMERS,
			payload: res.data && res.data.status === "success" ? res.data.data : {}
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