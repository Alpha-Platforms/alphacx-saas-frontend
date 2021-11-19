import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';


export const getSlas = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setSlasLoading());
	axios.get(`${config.stagingBaseUrl}/sla?per_page=50`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_SLAS,
			payload: res.data && res.data.status === "success" ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}

export const addSla = (newSla, successCallback, failureCallback) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newSla);

	axios.post(`${config.stagingBaseUrl}/sla`, body, userTokenConfig(getState))
		.then(res =>{ 
            dispatch({
                type: types.ADD_SLA,
                payload: res.data
            })
            successCallback && successCallback();
        })
		.catch(err => {
            dispatch(returnErrors(err.response?.data, err.response?.status))
            failureCallback && failureCallback();
        });

}

export const updateSla = (slaId, newSla, successCallback, failureCallback) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newSla);

	axios.patch(`${config.stagingBaseUrl}/sla/${slaId}`, body, userTokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.UPDATE_SLA,
				payload: res.data
			});
			successCallback && successCallback();
		})
		.catch(err => {
			dispatch(returnErrors(err.response?.data, err.response?.status))
			failureCallback && failureCallback();
		});

}


export const setSlasLoading = () => {
	return {
		type: types.SLAS_LOADING
	}
}