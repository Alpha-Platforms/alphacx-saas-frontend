/* eslint-disable */
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

export const getSubCategories = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setSubCategoriesLoading());
    axios
        .get(`${config.stagingBaseUrl}/sub-categories?per_page=50`, userTokenConfig(getState))
        .then((res) =>
            dispatch({
                type: types.GET_SUB_CATEGORIES,
                payload: res.data && res.data.status === 'success' ? res.data.data : {},
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response?.data, err.response?.status)));
};

export const addSubCategory = (newSubCategory) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify(newSubCategory);

    axios
        .post(`${config.stagingBaseUrl}/sub-categories`, body, userTokenConfig(getState))
        .then((res) =>
            dispatch({
                type: types.ADD_SUB_CATEGORY,
                payload: res.data,
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response?.data, err.response?.status)));
};

export const setSubCategoriesLoading = () => {
    return {
        type: types.SUB_CATEGORIES_LOADING,
    };
};
