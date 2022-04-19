/* eslint-disable */
import { NotificationManager } from 'react-notifications';
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

export const getSupervisors = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setSupervisorsLoading());
    axios
        .get(`${config.stagingBaseUrl}/users?role=Supervisor&per_page=500`, userTokenConfig(getState))
        .then((res) =>
            dispatch({
                type: types.GET_SUPERVISORS,
                payload: res.data && res.data.status === 'success' ? res.data.data : {},
            }),
        )
        .catch((err) => {
            dispatch({
                type: types.SUPERVISORS_LOADING_FAILED,
                payload: {},
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
};

export const getPaginatedSupervisors = (itemsPerPage, currentPage) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return console.error('Network error!');
    }
    dispatch(setSupervisorsLoading());
    axios
        .get(
            `${config.stagingBaseUrl}/users?role=Supervisor&per_page=${itemsPerPage}&page=${currentPage}`,
            userTokenConfig(getState),
        )
        .then((res) =>
            dispatch({
                type: types.GET_SUPERVISORS,
                payload: res.data && res.data.status === 'success' ? res.data.data : {},
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response?.data, err.response?.status)));
};

// valid redux action
export const getCurrentSupervisor = (id) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }
    setCurrentSupervisorLoading();
    const { supervisors } = getState().supervisor;

    const currentSupervisor = supervisors.filter((supervisor) => supervisor?.id === id)[0];

    // console.log("Current Supervisor", currentSupervisor);

    // if (getState().supervisor.currentSupervisor
    //     ?.id === id) {
    //     dispatch({
    //         type: types.GET_CURRENT_SUPERVISOR,
    //         payload: getState().supervisor.currentSupervisor
    //     })
    // } else

    if (currentSupervisor) {
        dispatch({ type: types.GET_CURRENT_SUPERVISOR, payload: currentSupervisor });
    } else {
        axios
            .get(`${config.stagingBaseUrl}/users/${id}`, userTokenConfig(getState))
            .then((res) =>
                dispatch({
                    type: types.GET_CURRENT_SUPERVISOR,
                    payload: res.data && res.data?.status === 'success' ? res.data.data : null,
                }),
            )
            .catch((err) => {
                dispatch(returnErrors(err?.response?.data, err?.response?.status));
                dispatch({
                    type: types.GET_CURRENT_SUPERVISOR,
                    payload: null,
                });
            });
    }
};

export const setCurrentSupervisorLoading = () => {
    return { type: types.CURRENT_SUPERVISOR_LOADING };
};

export const resetSupervisorCreated = () => ({ type: types.RESET_SUPERVISOR_CREATED });

export const setSupervisorsLoading = () => {
    return {
        type: types.SUPERVISORS_LOADING,
    };
};
