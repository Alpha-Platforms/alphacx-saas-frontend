/* eslint-disable */
import { NotificationManager } from 'react-notifications';
import { customAxios as axios, userTokenConfig } from '../../helper';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';

import { httpPostMain } from '../../helpers/httpMethods';

export const getTickets = () => (dispatch, getState) => {
    if (!navigator.onLine) {
        return;
    }
    dispatch(setTicketsLoading());
    axios
        .get(`${config.stagingBaseUrl}/tickets`, userTokenConfig(getState))
        .then((res) =>
            dispatch({
                type: types.GET_TICKETS,
                payload: res.data && res.data.status === 'success' ? res.data?.data : {},
            }),
        )
        .catch((err) => {
            dispatch({
                type: types.GET_CUSTOMERS,
                payload: {
                    meta: {
                        totalItems: '0',
                        itemsPerPage: 10,
                        currentPage: 1,
                        totalPages: 0,
                    },
                },
            });
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
};

export const getPaginatedTickets = (itemsPerPage, currentPage, success, failed) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return console.error('Network error!');
    }
    dispatch(setTicketsLoading());
    axios
        .get(`${config.stagingBaseUrl}/tickets?per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
        .then((res) => {
            dispatch({
                type: types.GET_TICKETS,
                payload: res.data && res.data.status === 'success' ? res.data?.data : {},
            });
            success && success();
        })
        .catch((err) => {
            dispatch({
                type: types.GET_TICKETS,
                payload: {
                    meta: {
                        totalItems: '0',
                        itemsPerPage: 50,
                        currentPage: 1,
                        totalPages: 0,
                    },
                },
            });
            failed && failed();
            dispatch(returnErrors(err.response?.data, err.response?.status));
        });
};

export const getSearchedTickets = (itemsPerPage, currentPage, searchVal) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return console.error('Network error!');
    }
    // parse search value
    const searchStr = searchVal.replace(/\W+/gi, ' ').replace(/\s+/gi, '%20');
    dispatch(setTicketsLoading());
    axios
        .get(
            `${config.stagingBaseUrl}/tickets?per_page=${itemsPerPage}&page=${currentPage}&search=${searchStr}`,
            userTokenConfig(getState),
        )
        .then((res) =>
            dispatch({
                type: types.GET_TICKETS,
                payload: res.data && res.data.status === 'success' ? res.data?.data : {},
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response?.data, err.response?.status)));
};

/*  */

// valid redux action
export const getCurrentTicket = (id) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }
    setCurrentTicketLoading();
    const { tickets } = getState().ticket;

    const currentTicket = tickets.filter((ticket) => ticket?.id === id)[0];

    // console.log("Current Ticket", currentTicket);

    axios
        .get(`${config.stagingBaseUrl}/tickets/${id}`, userTokenConfig(getState))
        .then((res) => {
            // console.log("Single ticket data from ticket action: ", res?.data);
            dispatch({
                type: types.GET_CURRENT_TICKET,
                payload: res.data && res.data?.status === 'success' ? res.data?.data : null,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err?.response?.data, err?.response?.status));
            dispatch({ type: types.GET_CURRENT_TICKET, payload: null });
        });
    /*
    if (getState().ticket.currentTicket
        ?.id === id) {
        dispatch({
            type: types.GET_CURRENT_TICKET,
            payload: getState().ticket.currentTicket
        })
    } else if (currentTicket) {
        dispatch({type: types.GET_CURRENT_TICKET, payload: currentTicket})
    } else {
        axios
            .get(`${config.stagingBaseUrl}/users/${id}`, userTokenConfig(getState))
            .then(res => dispatch({
                type: types.GET_CURRENT_TICKET,
                payload: res.data && res.data?.status === "success"
                    ? res.data?.data
                    : null
            }))
            .catch(err => {
                dispatch(returnErrors(err?.response?.data, err?.response?.status))
                dispatch({
                    type: types.GET_CURRENT_TICKET,
                    payload: null
                })
            });
    } */
};

export const addTicket = (newTicket, success, failed) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify(newTicket);

    axios
        .post(`${config.stagingBaseUrl}/tickets`, body, userTokenConfig(getState))
        .then(async (res) => {
            dispatch({ type: types.ADD_TICKET, payload: res.data });
            success && success();
        })
        .catch((err) => {
            dispatch(returnErrors(err.response?.data, err.response?.status));
            failed && failed(err?.response?.data?.message);
        });
};

export const resetTicketCreated = () => ({ type: types.RESET_TICKET_CREATED });

export const setTicketsLoading = () => {
    return { type: types.TICKETS_LOADING };
};

export const setCurrentTicketLoading = () => {
    return { type: types.CURRENT_TICKET_LOADING };
};
