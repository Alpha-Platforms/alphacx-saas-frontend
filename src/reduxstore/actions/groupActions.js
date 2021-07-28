import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getGroups = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setGroupsLoading());
	axios.get(`${config.stagingBaseUrl}/groups`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_GROUPS,
			payload: (res.data && res.data.status === "Success") ? res.data.data : []
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const setGroupsLoading = () => {
	return {
		type: types.GROUPS_LOADING
	}
}