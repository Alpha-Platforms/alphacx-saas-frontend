import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';
import {userTokenConfig} from '../../helper';

export const getLivechatConfig = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setTagsLoading());
    axios
        .get(`${config.stagingBaseUrl}/settings/config?type=livechat`, userTokenConfig(getState))
        .then(res => dispatch({
            type: types.GET_LIVECHAT_CONFIG,
            payload: res.data.status === "success"
                ? res.data
                    ?.data
                    : {}
        }))
        .catch(err => {
            dispatch({
                type: types.GET_LIVECHAT_CONFIG,
                payload: {}
            });
            dispatch(returnErrors(err.response?.data, err.response?.status))
        });
}

export const updateLivechatConfig = (newLivechatConfig, success, failed) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }

    const body = {
        livechat_config: newLivechatConfig
    };

    axios.patch(`${config.stagingBaseUrl}/settings/livechat-config`, JSON.stringify(body), userTokenConfig(getState)).then(res => {
        if (res.data
            ?.status === "success") {
            success && success();
			dispatch({
				type: types.UPDATE_LIVECHAT_CONFIG
			});
        } else {
            failed && failed();
        }
    }).catch(err => {
        dispatch(returnErrors(err.response?.data, err.response?.status));
        failed && failed();
    });
}

export const setTagsLoading = () => {
    return {type: types.TAGS_LOADING}
}