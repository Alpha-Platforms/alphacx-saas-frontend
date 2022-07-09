/* eslint-disable import/prefer-default-export */
import * as types from '../types';
import { httpGet } from '../../helpers/httpMethods';

export const getSubscription = (tenantId, success, failed) => async (dispatch) => {
    // eslint-disable-next-line no-param-reassign
    if (!tenantId) tenantId = window.localStorage.getItem('tenantId');
    const res = await httpGet(`subscriptions/${tenantId}`);
    if (res?.status === 'success') {
        dispatch({
            type: types.GET_SUBSCRIPTION,
            payload: res?.data,
        });
        success && success instanceof Function && success();
    } else {
        failed && success instanceof Function && failed();
    }
};
