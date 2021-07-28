import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';

export const loadUser = () => (dispatch, getState) => { //getState fetches the current statue  in the reducer store

    dispatch({type: types.USER_LOADING});

    const userToken = getState().userAuth.userToken;

    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If userToken, add to headers
    if (userToken) {

        axiosConfig.headers['Authorization'] = `Bearer ${userToken}`;

        axios
            .get(`${config.stagingBaseUrl}/auth/login`, axiosConfig)
            .then(res => {
                dispatch({type: types.USER_LOADED, payload: res.data.data})
            })
            .catch(err => {
                err.response && dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: types.USER_AUTH_ERROR});
            })
    } else {
        dispatch(returnErrors("No userToken in local storage.", 404));
        dispatch({type: types.USER_AUTH_ERROR});
    }

}

// action function to login user
export const loginUser = ({email, password, tenantToken}) => dispatch => {
    //header (config)
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tenantToken}`
        }
    }

    //Request body
    const body = JSON.stringify({email, password});

    dispatch({type: types.ATTEMPT_USER_LOGIN})

    // make post requeest to server
    axios
        .post(`${config.stagingBaseUrl}/auth/login`, body, axiosConfig)
        .then(res => dispatch({type: types.USER_LOGIN_SUCCESS, payload: res.data.data}))
        .catch(err => {
            err.response && dispatch(returnErrors(err.response.data, err.response.status, 'USER_LOGIN_FAIL'));
            dispatch({type: types.USER_LOGIN_FAIL})
            dispatch({type: types.ATTEMPT_USER_LOGIN_FAILED})
            window.setTimeout(() => {
                dispatch({type: types.RESET_USER_LOGIN_FAILED})
            }, 3000)
        })

}

// action function to logout user
export const logoutUser = () => {
    return {type: types.USER_LOGOUT_SUCCESS}
}

// function to return userToken config
export const tokenConfig = getState => {
    //get userToken from local storage
    const userToken = getState().auth.userToken;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If userToken, add to headers
    if (userToken) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return config;

}