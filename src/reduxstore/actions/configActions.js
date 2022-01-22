import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getConfigs = (success) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setConfigsLoading());
	axios.get(`${config.stagingBaseUrl}/settings/config`, userTokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.GET_CONFIGS,
				payload: (res.data && res.data.status === "success") ? res.data?.data : {}
			})
			success && success();
		})
		.catch(err => {
			dispatch({
				type: types.GET_CONFIGS,
				payload: {}
			});
			dispatch(returnErrors(err.response?.data, err.response?.status))
		});
}



// valid redux action
export const updateEmailConfig = (emailConfig, successCallback, failureCallback) => (dispatch, getState) => {
	// Request body
	const body = JSON.stringify(emailConfig);
	axios.patch(`${config.stagingBaseUrl}/settings/ticket-email-template`, body, userTokenConfig(getState))
		.then(res => {
			successCallback && successCallback();
		})
		.catch(err => {
			dispatch(returnErrors(err.response?.data, err.response?.status))
			failureCallback && failureCallback();
		});
}


export const updateTwitterConfig = (newTwitterConfig, success, failed) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }

    const body = {
        twitter_config: newTwitterConfig
    };

    axios.patch(`${config.stagingBaseUrl}/settings/twitter-config`, JSON.stringify(body), userTokenConfig(getState)).then(res => {
        if (res.data
            ?.status === "success") {
            success && success(res?.data);
			dispatch({
				type: types.UPDATE_TWITTER_CONFIG,
				payload: res.data?.data
			});
        } else {
            failed && failed('');
        }
    }).catch(err => {
        dispatch(returnErrors(err.response?.data, err.response?.status));
        failed && failed(err.response?.message || '');
    });
}


export const setConfigsLoading = () => {
	return {
		type: types.CONFIGS_LOADING
	}
}