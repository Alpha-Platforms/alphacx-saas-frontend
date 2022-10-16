// @ts-nocheck
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { NotificationManager } from 'react-notifications';
import { config } from '../config/keys';

const { csrlBaseUrl } = config;

// Get and save CSRL accessToken for requests
// const getCSRLAccessToken = async () => {
//   if (!localStorage.getItem("csrlToken")) {

//     const res = await axios.post("https://restserverstaging.cardinalstone.com/api/authenticate", {
//         "username": "alPha.cx",
//         "password": "Omega@2021",
//         "withoutGroups": true
//       }
//     );
//     if (res.status === 200) {
//       window.localStorage.setItem("csrlToken", res.data.accessToken);
//     }
//   }
// }
// THE ABOVE COMMENTED CODE ISN'T NECESSARY ANYMORE. CSRL TOKEN IS RETURNED FROM LOGIN

export const httpOnpremGet = async (url) => {
    // getCSRLAccessToken()

    if (!navigator.onLine) {
        return NotificationManager.error('Please check your internet', 'Opps!', 3000);
    }

    // check if token has expired and logout
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const isTokenExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

    if (isTokenExpired) {
        localStorage.clear();
        NotificationManager.success('Your session has expired. Redirecting to login...');
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    }

    try {
        const res = await axios.get(`${csrlBaseUrl}/${url}`, {
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
            },
        });
        return res;
    } catch (error) {
        return { error };
    }
};
