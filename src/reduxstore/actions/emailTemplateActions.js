/* eslint-disable */
import { NotificationManager } from 'react-notifications';
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

export const getEmailTemplates = (successCallback) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setEmailTemplatesLoading());
    axios
        .get(`${config.stagingBaseUrl}/settings/email-templates`, userTokenConfig(getState))
        .then((res) => {
            dispatch({
                type: types.GET_EMAIL_TEMPLATES,
                payload: res.data && res.data.status == 'Success' ? res.data?.data : [],
            });
            successCallback && successCallback();
        })
        .catch((err) => {
            dispatch({
                type: types.GET_EMAIL_TEMPLATES,
                payload: [],
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
};

export const addEmailTemplate = (newEmailTemplate, successCallback, failureCallback) =>
    function (dispatch, getState) {
        if (!navigator.onLine) {
            return null;
        }

        // Request body
        const body = JSON.stringify(newEmailTemplate);

        axios
            .post(`${config.stagingBaseUrl}/settings/email-template`, body, userTokenConfig(getState))
            .then((res) => {
                // console.log(res)
                dispatch({ type: types.ADD_EMAIL_TEMPLATE, payload: res.data });
                successCallback && successCallback();
            })
            .catch((err) => {
                // console.log(err.response)
                dispatch(returnErrors(err.response?.data, err.response?.status));
                failureCallback && failureCallback(err?.response?.data?.message);
            });
    };

//
export const updateEmailTemplate =
    (emailTemplateId, emailTemplate, successCallback, failureCallback) => (dispatch, getState) => {
        // Request body
        const body = JSON.stringify(emailTemplate);
        axios
            .patch(
                `${config.stagingBaseUrl}/settings/email-template/${emailTemplateId}`,
                body,
                userTokenConfig(getState),
            )
            .then((res) => {
                successCallback && successCallback();
            })
            .catch((err) => {
                dispatch(returnErrors(err.response?.data, err.response?.status));
                failureCallback && failureCallback(err.response?.data?.message);
            });
    };

export const getCurrentEmailTemplate = (emailTemplateId, successCallback, failureCallback) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }
    setCurrentEmailTemplateLoading();
    // alert("emailTemplateId");
    if (emailTemplateId) {
        dispatch(setCurrentEmailTemplateLoading());
        axios
            .get(`${config.stagingBaseUrl}/settings/email-template/${emailTemplateId}`, userTokenConfig(getState))
            .then((res) => {
                // console.log(res);
                dispatch({
                    type: types.GET_CURRENT_EMAIL_TEMPLATE,
                    payload: res.data && res.data?.status == 'Success' ? res?.data?.data[0] : null,
                });
            })
            .catch((err) => {
                dispatch(returnErrors(err?.response?.data?.message, err?.response?.status));
                dispatch({
                    type: types.GET_CURRENT_EMAIL_TEMPLATE,
                    payload: null,
                });
            });
    }
};

export const setEmailTemplatesLoading = () => {
    return {
        type: types.EMAIL_TEMPLATES_LOADING,
    };
};

export const setCurrentEmailTemplateLoading = () => {
    return {
        type: types.CURRENT_EMAIL_TEMPLATE_LOADING,
    };
};
