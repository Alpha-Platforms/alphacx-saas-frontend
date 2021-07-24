import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getPriorities = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setPrioritiesLoading());
	axios.get(`${config.stagingBaseUrl}/priorities?per_page=50`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_PRIORITIES,
			payload: res.data && res.data.status === "success" ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setPrioritiesLoading = () => {
	return {
		type: types.PRIORITIES_LOADING
	}
}