// @ts-nocheck
/* eslint-disable import/prefer-default-export */
import * as types from '../types';
import { httpGet } from '../../helpers/httpMethods';

export const getTenantInfo = (tenantDomain, success, failed) => async (dispatch) => {
    // eslint-disable-next-line no-param-reassign
    if (tenantDomain) {
        const res = await httpGet(`auth/tenant-info/${tenantDomain}`);
        if (res?.status === 'success') {
            dispatch({
                type: types.GET_TENANT_INFO,
                payload: res?.data,
            });
            success && success instanceof Function && success();
        } else {
            failed && success instanceof Function && failed();
        }
    }
};
