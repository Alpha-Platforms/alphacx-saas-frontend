/* eslint-disable */
import { NotificationManager } from 'react-notifications';
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

export const getChannels = (successCallback) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setChannelsLoading());
    axios
        .get(`${config.stagingBaseUrl}/channel?per_page=20`, userTokenConfig(getState))
        .then((res) => {
            dispatch({
                type: types.GET_CHANNELS,
                payload: res.data && res.data.status == 'success' ? res.data?.data?.channels : [],
            });
            successCallback && successCallback();
        })
        .catch((err) => {
            dispatch({
                type: types.GET_CHANNELS,
                payload: [],
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
};

export const addChannel = (newChannel, successCallback, failureCallback) =>
    function (dispatch, getState) {
        if (!navigator.onLine) {
            return null;
        }

        // Request body
        const body = JSON.stringify(newChannel);

        axios
            .post(`${config.stagingBaseUrl}/channel`, body, userTokenConfig(getState))
            .then((res) => {
                dispatch({ type: types.ADD_CHANNEL, payload: res?.data?.data });
                successCallback && successCallback();
            })
            .catch((err) => {
                dispatch(returnErrors(err.response?.data, err.response?.status));
                failureCallback && failureCallback(err?.response?.data?.message);
            });
    };

//
export const updateChannel = (channelId, channel, successCallback, failureCallback) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify(channel);
    axios
        .patch(`${config.stagingBaseUrl}/channel/${channelId}`, body, userTokenConfig(getState))
        .then((res) => {
            dispatch({ type: types.UPDATE_CHANNEL, payload: res?.data?.data });
            successCallback && successCallback();
        })
        .catch((err) => {
            dispatch(returnErrors(err.response?.data, err.response?.status));
            failureCallback && failureCallback(err.response?.data?.message);
        });
};

export const setChannelsLoading = () => {
    return {
        type: types.CHANNELS_LOADING,
    };
};
