/* eslint-disable no-bitwise */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
// @ts-nocheck
import { CsvBuilder } from 'filefy';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { config } from './config/keys';
import store from './reduxstore/store';
// import AlpacxLogoMain from './assets/images/alphacx-logo-main.png';
// import AlpacxIconMain from './assets/images/alphacx-app-icon-white.png';
import AlpacxLogoMain from './assets/images/alphacx-logo.png';
import AlpacxIconMain from './assets/imgF/AlphaCXLogo.png';

// function to return axios configuration with tenant token
export const tenantTokenConfig = (getState) => {
    // get tenant tenantToken from local storage
    const { tenantToken } = getState().tenantAuth;

    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If tenantToken, add to headers
    if (tenantToken) {
        axiosConfig.headers.Authorization = `Bearer ${tenantToken}`;
    }

    return axiosConfig;
};

// function to return axios configuration with user token
export const userTokenConfig = () => {
    // get tenant tenantToken from local storage
    // const userToken = getState().userAuth.userToken;
    const userToken = window.localStorage.getItem('token');

    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Domain: localStorage.getItem('domain'),
        },
    };

    // If tenantToken, add to headers
    if (userToken) {
        axiosConfig.headers.Authorization = `Bearer ${userToken}`;
    }

    return axiosConfig;
};

export const wordCapitalize = (word) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    return `${word}`.charAt(0).toUpperCase() + word?.slice(1);
};

export const exportTable = (exportColumns, exportData, exportType, fileName) => {
    const exportColumnsTitle = exportColumns.map((column) => column.title);
    const exportDataFields = exportData.map((rowData) =>
        exportColumns.map((column) => {
            switch (column.field) {
                case 'contact':
                    return `${rowData.name}`.trim();
                case 'createdTime':
                    return `${rowData.created}`.trim();
                case 'rating':
                    return rowData.rating ? rowData.rating?.value || '' : '';
                default:
                    return rowData[column.field];
            }
        }),
    );

    if (exportType.toLowerCase() === 'csv') {
        const builder = new CsvBuilder(`${fileName}.csv`);
        builder.setColumns(exportColumnsTitle).addRows(exportDataFields).exportFile();
    } else if (exportType.toLowerCase() === 'pdf') {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF();

        doc.autoTable({
            head: [exportColumnsTitle],
            body: exportDataFields,
        });

        doc.save(`${fileName}.pdf`);
    }
};

export const getUserInitials = (name) => {
    // eslint-disable-next-line no-param-reassign
    name = name.toUpperCase();
    const nameArr = name.split(' ');
    const firstInitial = nameArr[0] && nameArr[0][0];
    const secondInitial = nameArr[1] && nameArr[1][0];
    const result = `${firstInitial || ''}${secondInitial || ''}`;
    return <span>{result}</span>;
};

export const uuid = () => {
    let dt = new Date().getTime();
    // eslint-disable-next-line func-names
    const uuidValue = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'?.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line no-bitwise
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        // eslint-disable-next-line no-bitwise
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuidValue;
};

export const textCapitalize = (str = '') => {
    return str ? str.toLowerCase()?.replace(/(^|\s)\S/g, (L) => L.toUpperCase()) : '';
};

export const slugify = (str = '') => {
    return str ? str.toLowerCase()?.replace(/\W+/gi, ' ')?.replace(/_/gi, ' ').trim()?.replace(/\s+/gi, '-') : '';
};

export const shuffleArray = (array) => {
    // clone the array
    const clonedArray = JSON.parse(JSON.stringify(array));
    // randomly shuffle the array
    // eslint-disable-next-line no-plusplus
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    // return shuffled array
    return clonedArray;
};

const ONE_MB = 1048576;

export const allowedFiles = {
    // .pdf, .txt, .doc, .docx, .rtf, .ppt, .pptx
    types: [
        'image/png',
        'image/jpeg',
        'image/gif',
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/rtf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    ext: ['.png', '.jpg', '.gif', '.pdf', '.txt', '.doc', '.docx', '.rtf', '.ppt', '.pptx'],
    maxSize: 50 * ONE_MB,
};

export const allowDocs = {
    types: [
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/rtf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    ext: ['.pdf', '.txt', '.doc', '.docx', '.rtf', '.ppt', '.pptx'],
    maxSize: 50 * ONE_MB,
};

export const getAcceptValue = (extArray, typesArray) => {
    const acceptValue = `${extArray.join(',')},${typesArray.join(',')}`;
    return acceptValue;
};

export const redirectToSub = (history, location, tenantSubscription) => {
    if (tenantSubscription) {
        const numOfSubUsers = tenantSubscription?.subscription?.no_of_users;
        const totalUsers = tenantSubscription?.subscription?.totalUsers;
        const endDate = tenantSubscription?.subscription?.end_date;
        const subExpired = moment(endDate).isBefore(new Date());

        const shouldShowUserExceededNotif = !tenantSubscription?.plan?.is_trial && totalUsers > numOfSubUsers;
        // history is useHistory from react router dom
        if (history && location && tenantSubscription && location.pathname !== '/settings/account') {
            if (shouldShowUserExceededNotif && location.pathname !== '/settings/users') {
                history.push('/settings/users');
            } else if (subExpired) {
                history.push('/settings/account?tab=subscription');
            }
        }
    }
};

export const separateNum = (num) => {
    if (typeof num !== 'number') return num;

    return num.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

//
export const multiIncludes = (arr, checkArr) => {
    if (!Array.isArray(arr) || !Array.isArray(checkArr)) throw new Error('Arguments must be array');
    // if (!Array.isArray(arr) || !Array.isArray(checkArr)) return false;

    let allIncluded = true;
    checkArr.forEach((x) => {
        if (arr.indexOf(x) === -1) {
            allIncluded = false;
        }
    });
    return allIncluded;
};
export const defaultTicketProperties = {
    status: { id: '23838da6-0566-11ea-9a9f-362b9e225667' }, // Open, but name may be changed by tenant

    priority: { id: '5a6635d0-0561-11ea-8d71-362b9e155667' }, // Medium, but name may be changed by tenant
};

const newAxios = axios.create();

export const refreshUserTokens = (redirectToLoginIfNoToken = false) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken && token) {
            // token can be refreshed
            // check for token
            const decodedToken = jwt_decode(token);
            const isTokenExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
            if (isTokenExpired) {
                // refresh tokens
                try {
                    const res = await axios.post(
                        `${config.stagingBaseUrl}/auth/refreshToken`,
                        { refreshToken },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                                domain: localStorage.getItem('domain'),
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json',
                            },
                        },
                    );
                    const newToken = res.data?.token?.token;
                    const newRefreshToken = res.data?.token?.refreshToken;
                    // update new tokens in local storage
                    localStorage.setItem('token', newToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    const localStorageUser = JSON.parse(window.localStorage.getItem('user'));
                    if (localStorageUser && typeof localStorageUser === 'object') {
                        // overwrite tokens with new ones
                        localStorageUser.token = newToken;
                        localStorageUser.refreshToken = newRefreshToken;
                        window.localStorage.setItem('user', JSON.stringify(localStorageUser));
                    }

                    resolve(res.data?.token?.token);
                } catch (err) {
                    // refreshing tokens failed

                    // logout user
                    const onboardingSplash = localStorage.getItem('onboardingSplash');
                    localStorage.clear();
                    onboardingSplash && localStorage.setItem('onboardingSplash', onboardingSplash);
                    window.location.href = '/login';
                    resolve();
                }
            } else {
                // slide
                resolve();
            }
        } else {
            // logout user properly
            if (redirectToLoginIfNoToken) {
                const onboardingSplash = localStorage.getItem('onboardingSplash');
                const domain = localStorage.getItem('domain');
                const tenantId = localStorage.getItem('tenantId');
                const tenantToken = localStorage.getItem('tenantToken');
                localStorage.clear();
                onboardingSplash && localStorage.setItem('onboardingSplash', onboardingSplash);
                domain && localStorage.setItem('domain', domain);
                tenantId && localStorage.setItem('tenantId', tenantId);
                tenantToken && localStorage.setItem('tenantToken', tenantToken);
                window.location.href = '/login';
            }
            resolve();
        }
    });
};

const requestHandler = async (request) => {
    const newToken = await refreshUserTokens();
    if (newToken && request.headers) {
        request.headers.Authorization = `Bearer ${newToken}`;
    }

    return request;
};

const errorHandler = (error) => {
    return Promise.reject(error);
};

newAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error),
);

export const customAxios = newAxios;

export const getHostNameFromUrl = (url = '') => {
    if (url.startsWith('https://') || url.startsWith('http://')) {
        try {
            const { hostname } = new URL(url);
            return hostname;
        } catch (err) {
            return '';
        }
    } else {
        try {
            const { hostname } = new URL(`https://${url}`);
            return hostname;
        } catch (err) {
            return '';
        }
    }
};

export const getHostnamesFromString = (str = '') => {
    // string is semi-color separated
    return str
        .split(';')
        .map((url) => getHostNameFromUrl(url))
        .filter((item) => item)
        .join(';');
};

export const centToDollarCent = (centValue) => {
    const dollar = Math.trunc(centValue / 100);
    const cent = Number(
        Math.floor(centValue % 100)
            .toString()
            .slice(0, 2),
    );
    return [dollar, cent];
};

export const centToDollarCentv2 = (centValue) => {
    const dollar = separateNum(Math.trunc(centValue / 100));
    const cent = (centValue / 100).toFixed(2).toString().split('.').slice(-1);
    return `${dollar}.${cent}`;
};

/**
 * check if a plan has a feature
 */
export const hasFeatureAccess = (feature) => {
    const storeState = store.getState();
    const features = storeState?.subscription?.subscription?.plan?.features;
    if (features && Array.isArray(features) && feature) {
        const justFeatures = features?.map((item) => item?.name?.toLowerCase());
        if (justFeatures?.includes(feature?.toLowerCase())) return true;
    }
    return false;
};

export const isObjectEmpty = (obj) => {
    if (!obj) return true;

    return Object.keys(obj).length === 0;
};

export const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true;

export const scrollToView = (elemSelector) => {
    const elem = window.document.querySelector(elemSelector);
    if (elem) {
        elem.scrollIntoView();
    }
};

export const scrollToTop = (elemSelector) => {
    const elem = window.document.querySelector(elemSelector);
    if (elem) {
        elem.scrollTo(0, 0);
    }
};

export const scrollToBottom = (elemSelector) => {
    const elem = window.document.querySelector(elemSelector);
    if (elem) {
        elem.scrollTop = elem.scrollHeight;
    }
};

export const isValidObject = (obj) => {
    return obj.constructor.toString().indexOf('Object') > -1;
};

export const subscribeToEvent = (eventName, listener) => {
    window.document.addEventListener(eventName, listener);
};

export const unsuscribeFromEvent = (eventName, listener) => {
    window.document.removeEventListener(eventName, listener);
};

export const createEvent = (eventName, data, options = {}) => {
    const eventOptions = options && isValidObject(options) ? options : {};
    const event = new CustomEvent(eventName, { detail: data, ...eventOptions });
    window.document.dispatchEvent(event);
};

/**
 * Lighten (+ve) or darken (-ve) color.
 *
 * @param {string} col Color
 * @param {number} amt Intensity of light
 */
export const lightenColor = (col = '#000000', amt = 0) => {
    let usePound = false;

    if (col[0] === '#') {
        // eslint-disable-next-line no-param-reassign
        col = col.slice(1);
        usePound = true;
    }

    const num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    const hexVal = (g | (b << 8) | (r << 16)).toString(16);
    let newHexVal = hexVal;

    for (let i = 0; i < 6 - hexVal.length; i += 1) {
        newHexVal = `0${newHexVal}`;
    }

    return (usePound ? '#' : '') + newHexVal;
};

export const isHexColor = (color) => {
    const hexColorRegex = /^#([0-9a-f]{3}){1,2}$/i;
    return hexColorRegex.test(color);
};

/**
 * Get all branding information from the store.
 * +ve lightens or -ve darkens.
 *
 * @param {object | array} options obj = { col: (number), bgCol: number, kb: boolean } arr = ['icon', 'logo']
 *
 * @returns {object} object arguement ? { color: string, backgroundColor: string }
 * @returns {array} array argument ? ['icon', 'logo']
 */
export const brandKit = (options) => {
    const storeState = store.getState();
    const defaultColor = '#006298';
    const branding = storeState?.tenantInfo?.tenantInfo?.branding;
    const appColor = branding?.appColor || defaultColor;
    const kbHeroColor = branding?.kbHeroColor || defaultColor;
    const appIcon = branding?.appIcon || AlpacxIconMain;
    const appLogo = branding?.appLogo || AlpacxLogoMain;
    if (Array.isArray(options)) {
        return options?.map((item) => {
            if (item === 'icon') return appIcon;
            if (item === 'logo') return appLogo;
            if (item === 'default') return AlpacxLogoMain;
            return '';
        });
    }
    if (isValidObject(options)) {
        const colorToUse = options?.default ? defaultColor : options?.kb ? kbHeroColor : appColor;
        const validColor = isHexColor(colorToUse) ? colorToUse : defaultColor;
        const style = {};
        if (options.hasOwnProperty('col')) {
            style.color = lightenColor(validColor, typeof options?.col === 'number' ? options?.col : 0);
        }
        if (options.hasOwnProperty('bgCol')) {
            style.backgroundColor = lightenColor(validColor, typeof options?.bgCol === 'number' ? options.bgCol : 0);
        }
        return style;
    }
    return null;
};

/**
 * Get all branding information from the store.
 * +ve lightens or -ve darkens.
 *
 * @param {object | array} options obj = { col: (number), bgCol: number, kb: boolean } arr = ['icon', 'logo']
 *
 * @returns {object} object arguement ? { color: string, backgroundColor: string }
 * @returns {array} array argument ? ['icon', 'logo']
 */
export const kbBrandKit = (options) => {
    const storeState = store.getState();
    const defaultColor = '#363738';
    const branding = storeState?.tenantInfo?.kbBrandKit;
    const kbHeroColor = branding?.kbHeroColor || defaultColor;
    const appLogo = branding?.appLogo || AlpacxLogoMain;
    if (Array.isArray(options)) {
        return options?.map((item) => {
            if (item === 'logo') return appLogo;
            if (item === 'default') return AlpacxLogoMain;
            return '';
        });
    }
    if (isValidObject(options)) {
        const colorToUse = options?.default ? defaultColor : kbHeroColor;
        const validColor = isHexColor(colorToUse) ? colorToUse : defaultColor;
        const style = {};
        if (options.hasOwnProperty('col')) {
            style.color = lightenColor(validColor, typeof options?.col === 'number' ? options?.col : 0);
        }
        if (options.hasOwnProperty('bgCol')) {
            style.backgroundColor = lightenColor(validColor, typeof options?.bgCol === 'number' ? options.bgCol : 0);
        }
        return style;
    }
    return null;
};

export const getSubdomainOrUrl = (domain = '') => {
    const hostnameParts = window.location.hostname.split('.');
    if (domain) {
        if (process.env.NODE_ENV === 'development') {
            return `${window.location.protocol}//${domain}.${hostnameParts.slice(-1).join('.')}:${
                window.location.port
            }`;
        }
        return `${window.location.protocol}//${domain}.${hostnameParts.slice(-2).join('.')}:${window.location.port}`;
    }
    // Return subdomain if no arg
    if (process.env.NODE_ENV === 'development') {
        return hostnameParts.length === 2 ? hostnameParts[0] : '';
    }
    return hostnameParts.length === 3 ? hostnameParts[0] : '';
};

export const isSubdomainApp = () => {
    const subdomain = window.location.hostname.split('.')?.[0].toLowerCase();
    return subdomain === 'app' || subdomain === 'dev';
};
