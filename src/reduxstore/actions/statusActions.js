/* eslint-disable */
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

export const getStatuses = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setStatusesLoading());
    axios
        .get(`${config.stagingBaseUrl}/statuses?per_page=50`, userTokenConfig(getState))
        .then((res) =>
            dispatch({
                type: types.GET_STATUSES,
                payload: res.data && res.data.status === 'success' ? res.data.data : {},
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response?.data, err.response?.status)));
};

export const addStatus = (newStatus) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify(newStatus);

    axios
        .post(`${config.stagingBaseUrl}/statuses`, body, userTokenConfig(getState))
        .then((res) =>
            dispatch({
                type: types.ADD_STATUS,
                payload: res.data,
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response?.data, err.response?.status)));
};

export const updateStatus = (statusId, newStatus, successCallback, failureCallback) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify(newStatus);

    axios
        .patch(`${config.stagingBaseUrl}/statuses/${statusId}`, body, userTokenConfig(getState))
        .then((res) => {
            dispatch({
                type: types.UPDATE_STATUS,
                payload: res.data,
            });
            successCallback && successCallback();
        })
        .catch((err) => {
            dispatch(returnErrors(err.response?.data, err.response?.status));
            failureCallback && failureCallback();
        });
};

export const setStatusesLoading = () => {
    return {
        type: types.STATUSES_LOADING,
    };
};
