import axios from 'axios';
// import { hideLoader } from '../helpers/loader';
import { NotificationManager } from 'react-notifications';

export let baseUrl ="http://kustormar-auth.herokuapp.com/v1";
export let baseUrlMain ="https://kustormar-staging.herokuapp.com/v1";
//export let baseUrl = "https://api-dev.thenewspaperstand.com";
// export let baseUrl = process.env.REACT_APP_BASE_URL;
// export let baseUrl = "http://d3898537932a.ngrok.io";
// let getToken = localStorage.getItem("token")
let token = localStorage.getItem("token")
// const token = localStorage.getItem("DomainToken")


export const httpPostMain = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Opps!',
      3000
    );
  }
  try {
    const res = await axios.post(`${baseUrlMain}/${url}`, postBody, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    // hideLoader();

    if (
      error.response.data.message ===
      'Unauthorized, Your token is invalid or expired'
    ) {
      NotificationManager.error(
        'Your token is invalid or expired, please login',
        'Opps!',
        5000
      );
    }
    if (error.response.data.message === 'Validation Error!') {
      NotificationManager.error(
        Object.values(error.response.data.data).join('  ')
      );
      return;
    }
    return { er: error.response.data };
  }
};

export const httpPost = async (url, postBody) => {
    if (!navigator.onLine) {
      return NotificationManager.error(
        'Please check your internet',
        'Opps!',
        3000
      );
    }
    try {
      const res = await axios.post(`${baseUrl}/${url}`, postBody, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      // hideLoader();
  
      if (
        error.response.data.message ===
        'Unauthorized, Your token is invalid or expired'
      ) {
        NotificationManager.error(
          'Your token is invalid or expired, please login',
          'Opps!',
          5000
        );
      }
      if (error.response.data.message === 'Validation Error!') {
        NotificationManager.error(
          Object.values(error.response.data.data).join('  ')
        );
        return;
      }
      return { er: error.response.data };
    }
  };

export const httpPostData = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Opps!',
      3000
    );
  }

  try {
    const res = await axios.post(`${baseUrl}/api${url}`, postBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    if (
      error.response.data.message ===
      'Unauthorized, Your token is invalid or expired'
    ) {
      NotificationManager.error(
        'Your token is invalid or expired, please login',
        'Opps!',
        5000
      );
    }
    return { er: error.response.data };
  }
};

export const httpGetMain = async (url) => {
    if (!navigator.onLine) {
      return NotificationManager.error(
        'Please check your internet',
        'Opps!',
        3000
      );
    }
    try {
      const res = await axios.get(`${baseUrlMain}/${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      // hideLoader();
      console.log('eeeeeeee', error.response.data.message);
      if (
        error.response.data.message ===
        'Unauthorized, Your token is invalid or expired'
      ) {
       
        return { er: error.response.data.message };
      }
      if (error.response.data.message === 'Validation Error!') {
        NotificationManager.error(
          Object.values(error.response.data.data).join('  ')
        );
        return;
      }
      return { er: error.response.data };
    }
  };
  

export const httpGet = async (url) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Opps!',
      3000
    );
  }
  try {
    const res = await axios.get(`${baseUrl}/api/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    console.log('eeeeeeee', error.response.data.message);
    if (
      error.response.data.message ===
      'Unauthorized, Your token is invalid or expired'
    ) {
     
      return { er: error.response.data.message };
    }
    if (error.response.data.message === 'Validation Error!') {
      NotificationManager.error(
        Object.values(error.response.data.data).join('  ')
      );
      return;
    }
    return { er: error.response.data };
  }
};

export const httpPut = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Opps!',
      3000
    );
  }
  try {
    const res = await axios.put(`${baseUrl}/api/${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    NotificationManager.error(
      'Your token is invalid or expired, please login',
      'Opps!',
      5000
    );
    if (
      error.response.data.message ===
      'Unauthorized, Your token is invalid or expired'
    ) {
    }
    return { er: error.response.data };
  }
};

export const httpPatch = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Opps!',
      3000
    );
  }
  try {
    const res = await axios.patch(`${baseUrl}/api/${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    NotificationManager.error(
      'Your token is invalid or expired, please login',
      'Opps!',
      5000
    );
    if (
      error.response.data.message ===
      'Unauthorized, Your token is invalid or expired'
    ) {
    }
    return { er: error.response.data };
  }
};

export const httpDelete = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      'Please check your internet',
      'Opps!',
      3000
    );
  }
  try {
    const res = await axios.delete(`${baseUrl}/api/${url}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res;
  } catch (error) {
    // hideLoader();
    // hideLoader();
    return { er: error.response.data };
  }
};
