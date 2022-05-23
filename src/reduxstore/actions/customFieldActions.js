/* eslint-disable */
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

export const getCustomFields = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setCustomFieldsLoading());
    axios
        .get(`${config.stagingBaseUrl}/custom-field`, userTokenConfig(getState))
        .then((res) => {
            dispatch({
                type: types.GET_CUSTOM_FIELDS,
                payload: res.data.status === 'success' ? res.data?.data : [],
            });
        })
        .catch((err) => {
            dispatch({
                type: types.GET_CUSTOM_FIELDS,
                payload: [],
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
};

export const addCustomField = (data) => {
    return { type: types.ADD_CUSTOM_FIELD, payload: data };
};

export const setCustomFieldsLoading = () => {
    return { type: types.CUSTOM_FIELDS_LOADING };
};
