/* eslint-disable */
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

export const getLivechatConfig = (updateStateConfig, failed) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setTagsLoading());
    axios
        .get(`${config.stagingBaseUrl}/settings/config?type=livechat`, userTokenConfig(getState))
        .then((res) => {
            dispatch({
                type: types.GET_LIVECHAT_CONFIG,
                payload: res.data.status === 'success' ? res.data?.data : {},
            });
            if (res.data?.status === 'success') {
                updateStateConfig && updateStateConfig(res.data?.data);
            } else {
                failed && failed();
            }
        })
        .catch((err) => {
            dispatch({
                type: types.GET_LIVECHAT_CONFIG,
                payload: {},
            });
            failed && failed();
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
};

export const updateLivechatConfig = (newLivechatConfig, success, failed) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }

    const body = {
        livechat_config: newLivechatConfig,
    };

    axios
        .patch(`${config.stagingBaseUrl}/settings/livechat-config`, JSON.stringify(body), userTokenConfig(getState))
        .then((res) => {
            if (res.data?.status === 'success') {
                success && success();
                dispatch({
                    type: types.UPDATE_LIVECHAT_CONFIG,
                });
            } else {
                failed && failed('');
            }
        })
        .catch((err) => {
            dispatch(returnErrors(err.response?.data, err.response?.status));
            failed && failed(err.response?.message || '');
        });
};

export const setTagsLoading = () => {
    return { type: types.TAGS_LOADING };
};
