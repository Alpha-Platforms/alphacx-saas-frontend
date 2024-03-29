/* eslint-disable */
import { NotificationManager } from 'react-notifications';
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

export const getAgents = (success, failed) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setAgentsLoading());
    axios
        .get(`${config.stagingBaseUrl}/users?role=Agent&per_page=500`, userTokenConfig(getState))
        .then((res) => {
            dispatch({
                type: types.GET_AGENTS,
                payload: res.data && res.data.status === 'success' ? res.data.data : {},
            });
            success && success(res.data?.data);
        })
        .catch((err) => {
            dispatch({
                type: types.AGENTS_LOADING_FAILED,
                payload: {},
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
            failed && failed();
        });
};

export const getPaginatedAgents = (itemsPerPage, currentPage) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return console.error('Network error!');
    }
    dispatch(setAgentsLoading());
    axios
        .get(
            `${config.stagingBaseUrl}/users?role=Agent&per_page=${itemsPerPage}&page=${currentPage}`,
            userTokenConfig(getState),
        )
        .then((res) =>
            dispatch({
                type: types.GET_AGENTS,
                payload: res.data && res.data.status === 'success' ? res.data.data : {},
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response?.data, err.response?.status)));
};

/* export const addAgent = (newAgent) => (dispatch, getState) => {
	//Request body
	const body = JSON.stringify(newAgent);

	axios.post(`${config.stagingBaseUrl}/agent`, body, userTokenConfig(getState))
		.then(res => {
            console.log('AGENT RESPONSE => ', res);
            dispatch({
                type: types.ADD_AGENT,
                payload: res.data
            });
        })
		.catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
} */

export const addAgent = (newAgent, success, failed) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify(newAgent);
    
    const allGroups = getState()?.group?.groups;
    const { groupIds } = newAgent;

    axios
        .post(`${config.stagingBaseUrl}/agent`, body, userTokenConfig(getState))
        .then((res) => {
            // console.log('AGENT RESPONSE => ', res.data);
            if (res.data?.status === 'success') {
                success && success(res.data);
                const data = res.data?.data;
                const groups = groupIds?.map((grp_id) => {
                    const groupInArr = allGroups?.find((grp) => grp?.id === grp_id)
                    if (groupInArr) {
                        return {
                            id: groupInArr?.id,
                            group_id: groupInArr?.id,
                            group: {
                                ...groupInArr,
                            }
                        }
                    }
                    return {};
                });

                dispatch({
                    type:
                        data?.role === 'Administrator'
                            ? types.ADD_SINGLE_ADMIN
                            : data?.role === 'Supervisor'
                            ? types.ADD_SINGLE_SUPERVISOR
                            : types.ADD_SINGLE_AGENT,
                    payload: ((data) => {
                        switch (data.role) {
                            default:
                                const newData = {
                                    ...data,
                                    id: data?.userId,
                                    firstname: data?.firstName,
                                    lastname: data?.lastName,
                                    isActivated: true,
                                    groups,
                                    created_at: new Date(),

                                };
                                return newData;
                        }
                    })(data),
                });
            } else {
                failed && failed(res.data?.message);
            }
        })
        .catch((err) => {
            dispatch(returnErrors(err.response?.data, err.response?.status));
            failed && failed(err.response?.data?.message);
        });
};

// valid redux action
export const getCurrentAgent = (id) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }
    setCurrentAgentLoading();
    const { agents } = getState().agent;

    const currentAgent = agents && agents.filter((agent) => agent?.id === id)[0];

    // console.log("Current Agent", currentAgent);

    // if (getState().agent.currentAgent
    //     ?.id === id) {
    //     dispatch({
    //         type: types.GET_CURRENT_AGENT,
    //         payload: getState().agent.currentAgent
    //     })
    // } else

    if (currentAgent) {
        dispatch({ type: types.GET_CURRENT_AGENT, payload: currentAgent });
    } else {
        axios
            .get(`${config.stagingBaseUrl}/users/${id}`, userTokenConfig(getState))
            .then((res) =>
                dispatch({
                    type: types.GET_CURRENT_AGENT,
                    payload: res.data && res.data?.status === 'success' ? res.data.data : null,
                }),
            )
            .catch((err) => {
                dispatch(returnErrors(err?.response?.data, err?.response?.status));
                dispatch({
                    type: types.GET_CURRENT_AGENT,
                    payload: null,
                });
            });
    }
};

export const negateActiveState = (id) => {
    return {
        type: types.NEGATE_STATE,
        payload: id,
    };
};

export const setCurrentAgentLoading = () => {
    return { type: types.CURRENT_AGENT_LOADING };
};

export const resetAgentCreated = () => ({ type: types.RESET_AGENT_CREATED });

export const setAgentsLoading = () => {
    return {
        type: types.AGENTS_LOADING,
    };
};
