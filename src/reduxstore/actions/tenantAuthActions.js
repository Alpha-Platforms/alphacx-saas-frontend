import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';

export const loadTenant = () => (dispatch, getState) => { //getState fetches the current statue  in the reducer store

    dispatch({type: types.TENANT_LOADING});

    const tenantToken = getState().tenantAuth.tenantToken;

    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If tenantToken, add to headers
    if (tenantToken) {

        axiosConfig.headers['Authorization'] = `Bearer ${tenantToken}`;

        axios
            .get(`${config.authBaseUrl}/auth/login`, axiosConfig)
            .then(res => {
                dispatch({type: types.TENANT_LOADED, payload: res.data.data})
            })
            .catch(err => {
                err.response && dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: types.TENANT_AUTH_ERROR});
            })
    } else {
        dispatch(returnErrors("No tenantToken in local storage.", 404));
        dispatch({type: types.TENANT_AUTH_ERROR});
    }

}

// action function to login tenant using domain
export const loginTenant = ({domain}) => dispatch => {
    //header (config)
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({domain});

    dispatch({type: types.ATTEMPT_TENANT_LOGIN});

    // make post requeest to server
    axios
        .post(`${config.authBaseUrl}/auth/login`, body, axiosConfig)
        .then(res => dispatch({type: types.TENANT_LOGIN_SUCCESS, payload: res.data.data}))
        .catch(err => {
            err.response && dispatch(returnErrors(err.response.data, err.response.status, 'TENANT_LOGIN_FAIL'));
            dispatch({type: types.TENANT_LOGIN_FAIL})
            dispatch({type: types.ATTEMPT_TENANT_LOGIN_FAILED})
            window.setTimeout(() => {
                dispatch({type: types.RESET_TENANT_LOGIN_FAILED})
            }, 3000)
        })
}

// action function to logout tenant
export const logoutTenant = () => {
    return {type: types.TENANT_LOGOUT_SUCCESS}
}
