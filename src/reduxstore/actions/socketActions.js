import * as types from '../types';
import { uuid } from '../../helper';
import Socket from '../../socket';

// eslint-disable-next-line import/prefer-default-export
export const setAppSocket = () => {
    const domain = window.localStorage.getItem('domain');
    const tenantId = window.localStorage.getItem('tenantId');
    if (!domain || !tenantId) return null;

    return { type: types.SET_APP_SOCKET, payload: new Socket(uuid(), domain, tenantId) };
};
