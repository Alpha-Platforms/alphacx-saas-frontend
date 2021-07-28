import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getUsers = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setUsersLoading());
	axios.get(`${config.stagingBaseUrl}/users`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_USERS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const getPaginatedUsers = (itemsPerPage, currentPage) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return console.error("Network error!");
	}
	dispatch(setUsersLoading());
	axios.get(`${config.stagingBaseUrl}/users?per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_USERS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const getSearchedUsers = (itemsPerPage, currentPage, searchVal) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return console.error("Network error!");
	}
	// parse search value
	const searchStr = searchVal.replace(/\W+/gi, ' ').replace(/\s+/gi, '%20');
	dispatch(setUsersLoading());
	axios.get(`${config.stagingBaseUrl}/users?per_page=${itemsPerPage}&page=${currentPage}&search=${searchStr}`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_USERS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const setUsersLoading = () => {
	return {
		type: types.USERS_LOADING
	}
}