import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';
import { NotificationManager } from 'react-notifications';

export const getAgents = (success, failed) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setAgentsLoading());
	axios.get(`${config.stagingBaseUrl}/users?role=Agent&per_page=500`, userTokenConfig(getState))
		.then(res => {
            dispatch({
                type: types.GET_AGENTS,
                payload: (res.data && res.data.status === "success") ? res.data.data : {}
            });
            success && success(res.data?.data);
        })
		.catch(err => {
            dispatch({
                type: types.AGENTS_LOADING_FAILED,
                payload: {}
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
            failed && failed();
        });
}


export const getPaginatedAgents = (itemsPerPage, currentPage) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return console.error("Network error!");
	}
	dispatch(setAgentsLoading());
	axios.get(`${config.stagingBaseUrl}/users?role=Agent&per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_AGENTS,
			payload: (res.data && res.data.status === "success") ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}


export const addAgent = (newAgent) => (dispatch, getState) => {
	//Request body
	const body = JSON.stringify(newAgent);

	axios.post(`${config.stagingBaseUrl}/agent`, body, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.ADD_AGENT,
			payload: res.data
		}))
		.catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}

// valid redux action
export const getCurrentAgent = (id) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }
    setCurrentAgentLoading();
    const {agents} = getState().agent;

    let currentAgent = agents && agents.filter(agent => agent
        ?.id === id)[0];

    // console.log("Current Agent", currentAgent);

    // if (getState().agent.currentAgent
    //     ?.id === id) {
    //     dispatch({
    //         type: types.GET_CURRENT_AGENT,
    //         payload: getState().agent.currentAgent
    //     })
    // } else 
    
    if (currentAgent) {
        dispatch({type: types.GET_CURRENT_AGENT, payload: currentAgent})
    } else {
        axios
            .get(`${config.stagingBaseUrl}/users/${id}`, userTokenConfig(getState))
            .then(res => dispatch({
                type: types.GET_CURRENT_AGENT,
                payload: res.data && res.data?.status === "success"
                    ? res.data.data
                    : null
            }))
            .catch(err => {
                dispatch(returnErrors(err?.response?.data, err?.response?.status))
                dispatch({
                    type: types.GET_CURRENT_AGENT,
                    payload: null
                })
            });
    }
}

export const negateActiveState = (id) => {
    return {
        type: types.NEGATE_STATE,
        payload: id
    };
}

export const setCurrentAgentLoading = () => {
    return {type: types.CURRENT_AGENT_LOADING}
}

export const resetAgentCreated = () => ({type: types.RESET_AGENT_CREATED});

export const setAgentsLoading = () => {
	return {
		type: types.AGENTS_LOADING
	}
}