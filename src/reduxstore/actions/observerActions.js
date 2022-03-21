import { customAxios as axios } from "../../helper";
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getObservers = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setObserversLoading());
	axios.get(`${config.stagingBaseUrl}/users?role=Observer&per_page=500`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_OBSERVERS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => {
            dispatch({
                type: types.OBSERVERS_LOADING_FAILED,
                payload: {}
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
}


export const getPaginatedObservers = (itemsPerPage, currentPage) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return console.error("Network error!");
	}
	dispatch(setObserversLoading());
	axios.get(`${config.stagingBaseUrl}/users?role=Observer&per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_OBSERVERS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}

export const setObserversLoading = () => {
	return {
		type: types.OBSERVERS_LOADING
	}
}