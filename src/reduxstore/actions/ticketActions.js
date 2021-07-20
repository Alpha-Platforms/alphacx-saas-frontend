import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getTickets = () => (dispatch, getState) => {
	dispatch(setTicketsLoading());
	axios.get(`${config.stagingBaseUrl}/tickets`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_TICKETS,
			payload: res.data ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

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