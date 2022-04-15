/* eslint-disable */
import { NotificationManager } from 'react-notifications';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import { userTokenConfig, customAxios as axios } from '../../helper';

export const getAdmins = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setAdminsLoading());
    axios
        .get(`${config.stagingBaseUrl}/users?role=Administrator&per_page=500`, userTokenConfig(getState))
        .then((res) =>
            dispatch({
                type: types.GET_ADMINS,
                payload: res.data && res.data.status === 'success' ? res.data.data : {},
            }),
        )
        .catch((err) => {
            dispatch({
                type: types.ADMINS_LOADING_FAILED,
                payload: {},
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
};

export const getPaginatedAdmins = (itemsPerPage, currentPage) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return console.error('Network error!');
    }
    dispatch(setAdminsLoading());
    axios
        .get(
            `${config.stagingBaseUrl}/users?role=Administrator&per_page=${itemsPerPage}&page=${currentPage}`,
            userTokenConfig(getState),
        )
        .then((res) =>
            dispatch({
                type: types.GET_ADMINS,
                payload: res.data && res.data.status === 'success' ? res.data.data : {},
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response?.data, err.response?.status)));
};

// valid redux action
export const getCurrentAdmin = (id) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }
    setCurrentAdminLoading();
    const { admins } = getState().admin;

    const currentAdmin = admins.filter((admin) => admin?.id === id)[0];

    // console.log("Current Admin", currentAdmin);

    // if (getState().admin.currentAdmin
    //     ?.id === id) {
    //     dispatch({
    //         type: types.GET_CURRENT_ADMIN,
    //         payload: getState().admin.currentAdmin
    //     })
    // } else

    if (currentAdmin) {
        dispatch({ type: types.GET_CURRENT_ADMIN, payload: currentAdmin });
    } else {
        axios
            .get(`${config.stagingBaseUrl}/users/${id}`, userTokenConfig(getState))
            .then((res) =>
                dispatch({
                    type: types.GET_CURRENT_ADMIN,
                    payload: res.data && res.data?.status === 'success' ? res.data.data : null,
                }),
            )
            .catch((err) => {
                dispatch(returnErrors(err?.response?.data, err?.response?.status));
                dispatch({
                    type: types.GET_CURRENT_ADMIN,
                    payload: null,
                });
            });
    }
};

export const setCurrentAdminLoading = () => {
    return { type: types.CURRENT_ADMIN_LOADING };
};

export const resetAdminCreated = () => ({ type: types.RESET_ADMIN_CREATED });

export const setAdminsLoading = () => {
    return {
        type: types.ADMINS_LOADING,
    };
};
