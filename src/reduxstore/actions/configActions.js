import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getConfigs = (success) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setConfigsLoading());
	axios.get(`${config.stagingBaseUrl}/settings/config`, userTokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.GET_CONFIGS,
				payload: (res.data && res.data.status === "success") ? res.data?.data : null
			})
			success && success();
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}



// valid redux action
export const updateEmailConfig = (emailConfig, successCallback, failureCallback) => (dispatch, getState) => {
	// Request body
	const body = JSON.stringify(emailConfig);
	axios.patch(`${config.stagingBaseUrl}/settings/ticket-email-template`, body, userTokenConfig(getState))
		.then(res => {
			successCallback && successCallback();
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response?.status))
			failureCallback && failureCallback();
		});
}



export const setConfigsLoading = () => {
	return {
		type: types.CONFIGS_LOADING
	}
}