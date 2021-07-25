import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getStatuses = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setStatusesLoading());
	axios.get(`${config.stagingBaseUrl}/statuses?per_page=50`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_STATUSES,
			payload: res.data && res.data.status === "success" ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addStatus = (newStatus) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newStatus);

	axios.post(`${config.stagingBaseUrl}/statuses`, body, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.ADD_STATUS,
			payload: res.data
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}


export const setStatusesLoading = () => {
	return {
		type: types.STATUSES_LOADING
	}
}