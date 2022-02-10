import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';
import {userTokenConfig} from '../../helper';

export const getGroups = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setGroupsLoading());
    axios
        .get(`${config.stagingBaseUrl}/groups`, userTokenConfig(getState))
        .then(res => dispatch({
            type: types.GET_GROUPS,
            payload: (res.data && res.data.status === "Success")
                ? res.data.data
                : []
        }))
        .catch(err => dispatch(returnErrors(err.response
            ?.data, err.response
            ?.status)));
}

export const addGroup = (newGroup, success, failed) => (dispatch, getState) => {

    if (!navigator.onLine) {
        return null;
    }

    //Request body
    const body = JSON.stringify(newGroup);

    axios
        .post(`${config.stagingBaseUrl}/groups`, body, userTokenConfig(getState))
        .then(res => {
            dispatch({type: types.ADD_GROUP, payload: res.data});
			success && success();
			
        })
        .catch(err => {
			dispatch(returnErrors(err.response
				?.data, err.response
				?.status));
			failed && failed();
		});
}

// valid redux action
export const updateGroup = (groupId, teamInfo, success, failed) => (dispatch, getState) => {

    //Request body
    const body = JSON.stringify(teamInfo);
    
    axios
        .patch(`${config.stagingBaseUrl}/groups/${groupId}`, body, userTokenConfig(getState))
        .then(res => {
            // console.log(res)
            success && success();
        })
        .catch(err => {
            // console.log(err)
            dispatch(returnErrors(err.response
                ?.data, err.response
                ?.status))
            failed && failed();
        });

}

export const deleteGroup = (groupId, success, failed) => (dispatch, getState) => {
    
    axios
        .delete(`${config.stagingBaseUrl}/groups/${groupId}`, userTokenConfig(getState))
        .then(res => {
            // console.log(res)
            success && success(res);
        })
        .catch(err => {
            // console.log(err)
            // dispatch(returnErrors(err.response
            //     ?.data, err.response
            //     ?.status))
            failed && failed(err);
        });

}

export const setGroupsLoading = () => {
    return {type: types.GROUPS_LOADING}
}