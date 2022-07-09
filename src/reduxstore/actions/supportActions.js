/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import * as types from '../types';

export const SUPPORT_DOMAIN = 'manager';

export const createSupportTicket = (body, success, failed) => async (dispatch) => {
    try {
        const res = await axios.post(`${config.stagingBaseUrl}/customer/ticket`, body, {
            headers: {
                domain: SUPPORT_DOMAIN,
            },
        });
        if (res.data?.status?.toLowerCase() === 'success') {
            const supportTicket = {
                customer: {
                    customer: res.data?.data?.user || {},
                    ticket: res.data?.data?.ticket || {},
                    assignee: Array.isArray(res.data?.data?.assignee) ? res.data?.data?.assignee[0] : {},
                    token: res.data?.data?.token || {},
                    loading: 'loaded',
                    isAuthenticated: true,
                    justCreated: true,
                },
                chat: {
                    chat: [],
                    loading: 'loaded',
                },
            };
            dispatch({
                type: types.CREATE_SUPPORT_TICKET,
                payload: supportTicket,
            });
            return success && success();
        }
        return failed && failed();
    } catch (err) {
        dispatch(returnErrors(err?.response?.data, err?.response?.status));
        return failed && failed(err);
    }
};

export const setSupportModalActive = (val) => ({ type: types.SET_SUPPORT_MODAL_ACTIVE, payload: val });

export const falsifyJustCreated = (ticketId) => ({ type: types.FALSIFY_JUST_CREATED, payload: ticketId });
