import axios from "axios";
import {getToken} from "./authService";
import {hideLoader, showLoader} from "../helpers/loader";
import {NotificationManager} from "react-notifications";
export let baseUrl = "https://vkuatbe9k8.execute-api.us-east-1.amazonaws.com/dev/api/v1";
if (process.env.REACT_APP_NODE_ENV === "development") {
  baseUrl = "http://localhost:8080";
}

export const httpLogin = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error("Please check your internet", "Opps!", 3000);
  } else {
    const res = await axios.post(`${baseUrl}/${url}`, postBody);
    if (res.data.responseCode === "200") {
      return {data: res};
    } else {
      NotificationManager.error(res.data.responseMessage, "Opps!", 4000);
    }
    return null;
  }
};

export const httpPost = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error("Please check your internet", "Opps!", 3000);
  } else {
    try {
      const res = await axios.post(`${baseUrl}/${url}`, postBody, {
        headers: {Authorization: `Bearer ${localStorage.token}`},
      });
      console.log(res.data);
      if (res.data.responseCode === "200" || res.data.responsecode === "200") {
        return res.data;
      }

      NotificationManager.error(res.data.responseMessage || res.data.responsemesage || res.data.responsemessage, "Opps!", 4000);
    } catch (error) {
      // console.log(error.response.data);
      // if (error.response.data.detail === "Token is invalid or expired") {
      //   return (window.location.href = "/login");
      // }
      // console.log("my error", error);
      // return;

      if (error.response.data.responseCode === "401") {
        NotificationManager.error(error.response.data.detail, "Opps!", 4000);
      } else {
        NotificationManager.error(error.response.data.detail, "Opps!", 4000);
      }

      return {data: error.response.data};
    }
  }
};

export const httpPostData = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error("Please check your internet", "Opps!", 3000);
  }

  try {
    const res = await axios.post(`${baseUrl}${url}`, postBody, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    hideLoader();
    if (error.response.data.message === "Unauthorized, Your token is invalid or expired") {
      NotificationManager.error("Your token is invalid or expired, please login", "Opps!", 5000);
    }
    return {er: error.response.data};
  }
};

export const httpGet = async url => {
  if (!navigator.onLine) {
    return NotificationManager.error("Please check your internet", "Opps!", 3000);
  }
  try {
    const res = await axios.get(`${baseUrl}/${url}`, {
      headers: {Authorization: `Bearer ${localStorage.token}`},
    });
    return res.data;
  } catch (error) {
    hideLoader();

    return {er: error.response.data};
  }
};

export const httpPut = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error("Please check your internet", "Opps!", 3000);
  }
  try {
    const res = await axios.put(`${baseUrl}/${url}`, postBody, {
      headers: {Authorization: `Bearer ${localStorage.token}`},
    });
    return res.data;
  } catch (error) {
    hideLoader();
    NotificationManager.error("Your token is invalid or expired, please login", "Opps!", 5000);
    if (error.response.data.message === "Unauthorized, Your token is invalid or expired") {
    }
    return {er: error.response.data};
  }
};

export const httpPatch = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error("Please check your internet", "Opps!", 3000);
  }
  try {
    const res = await axios.patch(`${baseUrl}/${url}`, postBody, {
      headers: {Authorization: `Bearer ${localStorage.token}`},
    });
    return res.data;
  } catch (error) {
    hideLoader();
    NotificationManager.error("Your token is invalid or expired, please login", "Opps!", 5000);
    if (error.response.data.message === "Unauthorized, Your token is invalid or expired") {
    }
    return {er: error.response.data};
  }
};

export const httpDelete = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error("Please check your internet", "Opps!", 3000);
  }
  try {
    const res = await axios.delete(`${baseUrl}/${url}`, {
      headers: {Authorization: `Bearer ${localStorage.token}`},
    });
    return res;
  } catch (error) {
    hideLoader();
    hideLoader();
    return {er: error.response.data};
  }
};

export const axiosCalls = async (path, method, data = null, load) => {
  // console.log(`${baseUrl}/api${path}`, data);
  if (!load) {
    showLoader();
  }
  try {
    console.log(localStorage.token);
    let res = await axios({
      method,
      url: `${baseUrl}${path}`,
      data,
      headers: {Authorization: `Bearer ${localStorage.token}`},
    });
    if (res) {
      hideLoader();
      if (res.data.responsecode !== "200" || res.data.responseCode !== "200") {
        return {er: res.data};
      }
      return res.data;
    }
  } catch (err) {
    hideLoader();
    console.log("Error from axioscall", err);
    if (err.response) {
      return {er: err.response.data};
    }
    return {er: err};
  }
};

export const axiosCallsNoToken = async (path, method, data = null, load) => {
  // console.log(`${baseUrl}/api${path}`, data);
  if (!load) {
    showLoader();
  }
  try {
    let res = await axios({
      method,
      url: `${baseUrl}${path}`,
      data,
    });
    if (res) {
      hideLoader();
      console.log("this is the res ooo", res.data, typeof res.data.responseCode);
      if (res.data.responseCode !== "200") {
        console.log("i am here");
        return {er: res.data};
      }
      return res.data;
    }
  } catch (err) {
    hideLoader();
    console.log("Error from axioscall", err);
    if (err.response) {
      return {er: err.response.data};
    }
    return {er: err};
  }
};
