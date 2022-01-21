import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';
import {userTokenConfig} from '../../helper';

export const getTwitterConfig = (updateStateConfig) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setTagsLoading());
    axios
        .get(`${config.stagingBaseUrl}/settings/config?type=twitter`, userTokenConfig(getState))
        .then(res => {
            dispatch({
                type: types.GET_TWITTER_CONFIG,
                payload: res.data.status === "success"
                    ? res.data
                        ?.data
                        : {}
            });
            if (res.data?.status === "success") {
                updateStateConfig && updateStateConfig(res.data?.data);
            }
        })
        .catch(err => {
            dispatch({
                type: types.GET_TWITTER_CONFIG,
                payload: {}
            });
            dispatch(returnErrors(err.response?.data, err.response?.status))
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
            success && success();
			dispatch({
				type: types.UPDATE_TWITTER_CONFIG
			});
        } else {
            failed && failed('');
        }
    }).catch(err => {
        dispatch(returnErrors(err.response?.data, err.response?.status));
        failed && failed(err.response?.message || '');
    });
}

export const setTagsLoading = () => {
    return {type: types.TAGS_LOADING}
}