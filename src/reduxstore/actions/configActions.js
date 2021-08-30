import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getConfigs = () => (dispatch, getState) => {
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
			console.log("CONFIG RESPONSE: ", res.data);
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setConfigsLoading = () => {
	return {
		type: types.CONFIGS_LOADING
	}
}