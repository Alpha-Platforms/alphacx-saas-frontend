import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';
import {userTokenConfig} from '../../helper';

export const getAnalytics = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setAnalyticsLoading());
    axios
        .get(`${config.stagingBaseUrl}/analytics`, userTokenConfig(getState))
        .then(res => dispatch({
            type: types.GET_ANALYTICS,
            payload: res.data ? res.data.data : []
        }))
        .catch(err => dispatch(returnErrors(err.response
            ?.data, err.response
            ?.status)));
}

export const getNewAnalytics = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    axios
        .get(`${config.stagingBaseUrl}/new-analytics`, userTokenConfig(getState))
        .then(res => dispatch({
            type: types.GET_NEW_ANALYTICS,
            payload: res.data ? res.data?.data : {}
        }))
        .catch(err => dispatch(returnErrors(err.response
            ?.data, err.response
            ?.status)));
}

export const setAnalyticsLoading = () => {
    return {type: types.ANALYTICS_LOADING}
}