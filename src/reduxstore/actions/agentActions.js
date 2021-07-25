import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getAgents = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setAgentsLoading());
	axios.get(`${config.stagingBaseUrl}/users?role=Agent&per_page=50`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_AGENTS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const getPaginatedAgents = (itemsPerPage, currentPage) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return console.error("Network error!");
	}
	dispatch(setAgentsLoading());
	axios.get(`${config.stagingBaseUrl}/users?role=Agent&per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_AGENTS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const addAgent = (newAgent) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newAgent);

	axios.post(`${config.stagingBaseUrl}/agent`, body, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.ADD_AGENT,
			payload: res.data
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}


export const setAgentsLoading = () => {
	return {
		type: types.AGENTS_LOADING
	}
}