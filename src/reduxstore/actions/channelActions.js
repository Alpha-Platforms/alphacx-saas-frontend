import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';
import { NotificationManager } from 'react-notifications';

export const getChannels = (successCallback) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setChannelsLoading());
	axios.get(`${config.stagingBaseUrl}/channel`, userTokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.GET_CHANNELS,
				payload: (res.data && res.data.status == "success") ? res.data?.data?.channels : []
			})
			successCallback && successCallback();
		})
		.catch(err => {
			dispatch({
				type: types.GET_CHANNELS,
				payload: []
			});
			dispatch(returnErrors(err.response?.data, err.response?.status))
		});
}

export const addChannel = (newChannel, successCallback, failureCallback) => (dispatch, getState) => {

    if (!navigator.onLine) {
        return null;
    }

    //Request body
    const body = JSON.stringify(newChannel);

    axios
        .post(`${config.stagingBaseUrl}/channel`, body, userTokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({type: types.ADD_CHANNEL, payload: res.data});
			successCallback && successCallback();
        })
        .catch(err => {
            // console.log(err.response)
			dispatch(returnErrors(
                err.response?.data, 
                err.response?.status
            ));
			failureCallback && failureCallback(err?.response?.data?.message);
		});
}

//
export const updateChannel = (channelId, channel, successCallback, failureCallback) => (dispatch, getState) => {
	// Request body
	const body = JSON.stringify(channelId);
	axios.patch(`${config.stagingBaseUrl}/channel/${channel}`, body, userTokenConfig(getState))
		.then(res => {
			successCallback && successCallback();
		})
		.catch(err => {
			dispatch(returnErrors(err.response?.data, err.response?.status))
			failureCallback && failureCallback(err.response?.data?.message);
		});
}

export const setChannelsLoading = () => {
	return {
		type: types.CHANNELS_LOADING
	}
}
