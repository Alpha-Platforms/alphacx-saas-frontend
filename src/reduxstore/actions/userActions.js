import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';
import { NotificationManager } from 'react-notifications';
import store from '../store';

const {getState} = store;

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

// invalid redux action
export const updateUser = async (updatedUser) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }

    //Request body
    const body = JSON.stringify(updatedUser);

    try {
        const res = await axios.patch(`${config.stagingBaseUrl}/users/${updatedUser.id}`, body, userTokenConfig(getState));
        return res.data;
    } catch (err) {
        NotificationManager.error(err?.response?.data.message, 'Error');
        return err?.response?.data;
    }
}