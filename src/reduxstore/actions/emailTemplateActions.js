import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getEmailTemplates = (successCallback) => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setEmailTemplatesLoading());
	axios.get(`${config.stagingBaseUrl}/settings/email-templates`, userTokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.GET_EMAIL_TEMPLATES,
				payload: (res.data && res.data.status == "Success") ? res.data?.data : []
			})
			successCallback && successCallback();
		})
		.catch(err => {
			dispatch({
				type: types.GET_EMAIL_TEMPLATES,
				payload: []
			});
			dispatch(returnErrors(err.response?.data, err.response?.status))
		});
}

export const addEmailTemplate = (newEmailTemplate, successCallback, failureCallback) => (dispatch, getState) => {

    if (!navigator.onLine) {
        return null;
    }

    //Request body
    const body = JSON.stringify(newEmailTemplate);

    axios
        .post(`${config.stagingBaseUrl}/settings/email-template`, body, userTokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({type: types.ADD_EMAIL_TEMPLATE, payload: res.data});
			successCallback && successCallback();
        })
        .catch(err => {
			dispatch(returnErrors(
                err.response?.data, 
                err.response?.status
            ));
			failureCallback && failureCallback();
		});
}

//
export const updateEmailTemplates = (emailTemplateId, emailTemplate, successCallback, failureCallback) => (dispatch, getState) => {
	// Request body
	const body = JSON.stringify(emailTemplate);
	axios.patch(`${config.stagingBaseUrl}/settings/email-templates/${emailTemplateId}`, body, userTokenConfig(getState))
		.then(res => {
			successCallback && successCallback();
		})
		.catch(err => {
			dispatch(returnErrors(err.response?.data, err.response?.status))
			failureCallback && failureCallback();
		});
}



export const setEmailTemplatesLoading = () => {
	return {
		type: types.EMAIL_TEMPLATES_LOADING
	}
}