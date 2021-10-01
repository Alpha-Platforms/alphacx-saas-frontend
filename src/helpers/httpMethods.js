import axios from "axios";
// import { hideLoader } from '../helpers/loader';
import { NotificationManager } from "react-notifications";

export let baseUrl = process.env.REACT_APP_AUTH_BASE_URL;
export let baseUrlMain = process.env.REACT_APP_API_BASE_URL;

export const httpPostMain = async (url, postBody) => {

  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.post(`${baseUrlMain}/${url}`, postBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'domain': localStorage.getItem("domain"),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json' 
      },
    });
    return res.data;
  } catch (error) {
    // hideLoader();

    if (error.response.data.message === "Unauthorized, Your token is invalid or expired") {
      NotificationManager.error(
        "Your token is invalid or expired, please login",
        "Opps!",
        5000
      );
    }
    if (error.response.data.message === "Validation Error!") {
      NotificationManager.error(
        Object.values(error.response.data.data).join("  ")
      );
      return;
    }
    return { er: error.response.data };
  }
};

export const httpPost = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.post(`${baseUrl}/${url}`, postBody, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'domain': localStorage.getItem("domain"),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json' 
      },
    });
    return res.data;
  } catch (error) {
    // hideLoader();

    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      NotificationManager.error(
        "Your token is invalid or expired, please login",
        "Opps!",
        5000
      );
    }
    if (error.response.data.message === "Validation Error!") {
      NotificationManager.error(
        Object.values(error.response.data.data).join("  ")
      );
      return;
    }
    return { er: error.response.data };
  }
};

export const httpPostData = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }

  try {
    const res = await axios.post(`${baseUrl}/api${url}`, postBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'domain': localStorage.getItem("domain"),
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*',
      },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      NotificationManager.error(
        "Your token is invalid or expired, please login",
        "Opps!",
        5000
      );
    }
    return { er: error.response.data };
  }
};
export const httpPostNoAuth = async (url, postBody, newHeaders) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }

  try {
    const res = await axios.post(`${baseUrlMain}/${url}`, postBody, {
      headers: {
        ...newHeaders,
        // "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*',
      },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      NotificationManager.error(
        "Your token is invalid or expired, please login",
        "Opps!",
        5000
      );
    }
    return { er: error.response.data };
  }
};

export const httpGetMain = async (url) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.get(`${baseUrlMain}/${url}`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'domain': localStorage.getItem("domain"),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json' 
      },
    });

    return res.data;
  } catch (error) {
    // hideLoader();
    // console.log("eeeeeeee", error.response.data.message);
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      return { er: error.response.data.message };
    }
    if (error.response.data.message === "Validation Error!") {
      NotificationManager.error(
        Object.values(error.response.data.data).join("  ")
      );
      return;
    }
    return { er: error.response.data };
  }
};

export const httpGet = async (url) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.get(`${baseUrl}/${url}`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'domain': localStorage.getItem("domain"),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json' 
      },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    console.log("eeeeeeee", error.response.data.message);
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      return { er: error.response.data.message };
    }
    if (error.response.data.message === "Validation Error!") {
      NotificationManager.error(
        Object.values(error.response.data.data).join("  ")
      );
      return;
    }
    return { er: error.response.data };
  }
};

export const httpPut = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.put(`${baseUrl}/api/${url}`, postBody, {
      headers: { 
        Authorization: `Bearer ${localStorage.token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'  },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    NotificationManager.error(
      "Your token is invalid or expired, please login",
      "Opps!",
      5000
    );
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
    }
    return { er: error.response.data };
  }
};

export const httpPatchMain = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }

  try {
    const res = await axios.patch(`${baseUrlMain}/${url}`, postBody, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'domain': localStorage.getItem("domain"),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json' 
      },
    });
    return res.data;
  } catch (error) {
    // hideLoader();
    NotificationManager.error(
      "Your token is invalid or expired, please login",
      "Opps!",
      5000
    );
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
    }
    // console.log("token", token);
    return { er: error.response.data };
  }
};

export const httpDelete = async (url) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet",
      "Opps!",
      3000
    );
  }
  try {
    const res = await axios.delete(`${baseUrlMain}/${url}`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'domain': localStorage.getItem("domain"),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json' 
      },
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
