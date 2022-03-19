// @ts-nocheck
import {CsvBuilder} from 'filefy';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { config } from './config/keys';

// function to return axios configuration with tenant token
export const tenantTokenConfig = getState => {
    //get tenant tenantToken from local storage
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
    }

    return axiosConfig;
}

// function to return axios configuration with user token
export const userTokenConfig = getState => {
    //get tenant tenantToken from local storage
    // const userToken = getState().userAuth.userToken;
    const userToken = window.localStorage.getItem('token');

    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Domain': localStorage.getItem('domain')
        }
    }

    // If tenantToken, add to headers
    if (userToken) {
        axiosConfig.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return axiosConfig;
}

export const wordCapitalize = word => {
    return `${word}`
        .charAt(0)
        .toUpperCase() + word?.slice(1);
}

export const exportTable = (exportColumns, exportData, exportType, fileName) => {

    const exportColumnsTitle = exportColumns.map(column => column.title);
    const exportDataFields = exportData.map(rowData => exportColumns.map(column => {
        switch (column.field) {
            case 'contact':
                return `${rowData.name}`.trim();
            case 'createdTime':
                return `${rowData.created}`.trim();
            default:
                return rowData[column.field]
        }
    }));

    if (exportType.toLowerCase() === "csv") {
        const builder = new CsvBuilder(fileName + ".csv");
        builder
            .setColumns(exportColumnsTitle)
            .addRows(exportDataFields)
            .exportFile();
    } else if (exportType.toLowerCase() === "pdf") {
        const doc = new jsPDF();

        doc.autoTable({
            head: [exportColumnsTitle],
            body: exportDataFields
        });

        doc.save(fileName + '.pdf');
    }
}


export const getUserInitials = (name) => {
    name = name.toUpperCase();
    const nameArr = name.split(' ');
    const firstInitial = nameArr[0] && nameArr[0][0];
    const secondInitial = nameArr[1] && nameArr[1][0];
    const result = `${firstInitial
        ? firstInitial
        : ''}${secondInitial
            ? secondInitial
            : ''}`;
    return <span>{result}</span>;
}

export const uuid =() => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


export const textCapitalize = (str) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
}

export const slugify = (str) => {
	return str.toLowerCase().replace(/\W+/gi, ' ').replace(/_/gi, ' ').trim().replace(/\s+/gi, '-');
}

export const shuffleArray = (array) => {
    // clone the array
    const clonedArray = JSON.parse(JSON.stringify(array));
    // randomly shuffle the array
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    // return shuffled array
    return clonedArray;
}

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
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ],
    ext: [
        '.png', 
        '.jpg', 
        '.gif',
        '.pdf',
        '.txt',
        '.doc',
        '.docx',
        '.rtf',
        '.ppt',
        '.pptx'
    ],
    maxSize: 50 * ONE_MB
}

export const allowDocs = {
    types: [
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/rtf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ],
    ext: [
        '.pdf',
        '.txt',
        '.doc',
        '.docx',
        '.rtf',
        '.ppt',
        '.pptx'
    ],
    maxSize: 50 * ONE_MB
}

export const getAcceptValue = (extArray, typesArray) => {
    const acceptValue = extArray.join(',') + ',' + typesArray.join(',');
    return acceptValue;
}

export const redirectToSub = (history, location) => {
    // history is useHistory from react router dom
    if (history && location && location.pathname !== "/settings/account") {
        const tenantSubscription = JSON.parse(window.localStorage.getItem('tenantSubscription'));
        if (tenantSubscription && tenantSubscription?.subscription?.end_date) {
            if (moment(tenantSubscription?.subscription?.end_date).isBefore(new Date())) {
                // subscrition has ended
                history.push("/settings/account?tab=subscription");
            }
        }
    }
}

export const separateNum = (num) => {
    if (typeof num !== "number") return num;
    
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

//
export const multiIncludes = (arr, checkArr) => {
    if (!Array.isArray(arr) || !Array.isArray(checkArr)) throw new Error("Arguments must be array");
    // if (!Array.isArray(arr) || !Array.isArray(checkArr)) return false;
    
    let allIncluded = true;
    checkArr.forEach(x => {
      if (arr.indexOf(x) === -1) {
        allIncluded = false;
      }
    })
    return allIncluded
}
export const defaultTicketProperties = {
    status: {id: "23838da6-0566-11ea-9a9f-362b9e225667"}, // Open, but name may be changed by tenant

    priority: {id: "5a6635d0-0561-11ea-8d71-362b9e155667"} // Medium, but name may be changed by tenant
}

const newAxios = axios.create();

export const refreshUserTokens = (redirectToLoginIfNoToken = false) => {
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
                        `${config.baseUrl}/auth/refresh`,
                        { refreshToken },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                'domain': localStorage.getItem("domain"),
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json' 
                            },
                            }
                    );
                    const newToken = res.data?.token?.token;
                    const newRefreshToken = res.data?.token?.refreshToken;
                    // update new tokens in local storage
                    localStorage.setItem('token', newToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    const localStorageUser = JSON.parse(window.localStorage.getItem('user'));
                    if (localStorageUser & typeof localStorageUser === 'object') {
                        // overwrite tokens with new ones
                        localStorageUser.token = newToken;
                        localStorageUser.refreshToken = newRefreshToken;
                        window.localStorage.setItem('user', JSON.stringify(localStorageUser));
                    }
                    
                    resolve(res.data?.token?.token);
                } catch (err) {
                    // refreshing tokens failed

                    // logout user
                    const onboardingSplash = localStorage.getItem("onboardingSplash")
                    localStorage.clear()
                    onboardingSplash && localStorage.setItem("onboardingSplash", onboardingSplash)
                    window.location.href = "/login"
                    resolve();
                }
            } else {
                // slide
                resolve();
            }
        } else {
            // logout user properly
            if (redirectToLoginIfNoToken) {
                const onboardingSplash = localStorage.getItem("onboardingSplash")
                const domain = localStorage.getItem("domain")
                const tenantId = localStorage.getItem("tenantId")
                const tenantToken = localStorage.getItem("tenantToken")
                const tenantSubscription = localStorage.getItem("tenantSubscription")
                localStorage.clear()
                onboardingSplash && localStorage.setItem("onboardingSplash", onboardingSplash)
                domain && localStorage.setItem("domain", domain)
                tenantId && localStorage.setItem("tenantId", tenantId)
                tenantToken && localStorage.setItem("tenantToken", tenantToken)
                tenantSubscription && localStorage.setItem("tenantSubscription", tenantSubscription)
                window.location.href = "/login"
            }
            resolve();
        }
    });
};


const requestHandler = async (request) => {
    const newToken = await refreshUserTokens(true);
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