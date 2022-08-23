import * as types from '../types';
import { uuid } from '../../helper';
import Socket from '../../socket';

// eslint-disable-next-line import/prefer-default-export
export const setAppSocket = () => {
    const domain = window.localStorage.getItem('domain');
    const tenantId = window.localStorage.getItem('tenantId');
    if (!domain || !tenantId) return {};

    return { type: types.SET_APP_SOCKET, payload: new Socket(uuid(), domain, tenantId) };
};

export const setSocketMessage = (message) => {
    return { type: types.SET_SOCKET_MESSAGE, payload: message };
};

export const resetSocketMessage = (message) => {
    return { type: types.RESET_SOCKET_MESSAGE, payload: message };
};
