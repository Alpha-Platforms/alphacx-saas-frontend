import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getTickets = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setTicketsLoading());
	axios.get(`${config.stagingBaseUrl}/tickets`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_TICKETS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const getPaginatedTickets = (itemsPerPage, currentPage) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return console.error("Network error!");
	}
	dispatch(setTicketsLoading());
	axios.get(`${config.stagingBaseUrl}/tickets?per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_TICKETS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const getSearchedTickets = (itemsPerPage, currentPage, searchVal) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return console.error("Network error!");
	}
	// parse search value
	const searchStr = searchVal.replace(/\W+/gi, ' ').replace(/\s+/gi, '%20');
	dispatch(setTicketsLoading());
	axios.get(`${config.stagingBaseUrl}/tickets?per_page=${itemsPerPage}&page=${currentPage}&search=${searchStr}`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_TICKETS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

/*  */

export const addTicket = (newTicket) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newTicket);

	axios.post(`${config.stagingBaseUrl}/api/Tickets/addnewTicket`, body, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.ADD_TICKET,
			payload: res.data
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}


export const setTicketsLoading = () => {
	return {
		type: types.TICKETS_LOADING
	}
}