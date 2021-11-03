import axios from "axios";
// import { hideLoader } from '../helpers/loader';
import { NotificationManager } from "react-notifications";
import { parseDomain, ParseResultType } from "parse-domain";

export let baseUrl = process.env.REACT_APP_AUTH_BASE_URL;
export let baseUrlMain = process.env.REACT_APP_API_BASE_URL;
export const invalidTenant = 'invalid-tenant';

export const getSubdomain = hostname => {
  var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
  var urlParts = regexParse.exec(hostname);
  return hostname.replace(urlParts[0],'').slice(0, -1);
}

export const splitHostname = hostname => {
  const parseResult = parseDomain(window.location.hostname);

  // Check if the domain is listed in the public suffix list
  if (parseResult.type === ParseResultType.Listed) {
    const { subDomains, domain, topLevelDomains } = parseResult;
    return {subDomains, domain, topLevelDomains};
  } else {
    // if not a valid domain (domain is likely to be localhost)
    return false;
  }
}

// get the tenant domain from the url
export const getTenantDomain = () => {

  // const fallbackTenant = 'techpoint';

  // get hostname
  const hostname = window.location.hostname;

  // get splitted hostname

  const splittedHostname = splitHostname(hostname);

  if (splittedHostname) {
    const {subDomains, domain, topLevelDomains} = splittedHostname;
    // check for stagin and prod deployment
    if (domain === "alphacx" || domain === "qustomar") {
      // return the first subdomain
      if (subDomains[0]) {
        return subDomains[0];
      } else {
        return invalidTenant;
      }
    } else {
      return invalidTenant;
    }
  } else {
    // domain is likely to be dev localhost
    const splitLocal = hostname.split('.')[0];
    if (splitLocal.slice(0, 9) === "localhost") {
      return invalidTenant;
    } else {
      return splitLocal;
    }
  }
}

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


export const httpGetMainKB = async (url) => {
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
        'domain': localStorage.getItem("domain") || getTenantDomain(),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json' 
      },
    });
    console.log('From try block');
    return res.data;
  } catch (error) {
    if (error.response.data.error?.substr(-14) === 'does not exist') {
      return invalidTenant;
    }
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


export const httpGetMainNoAuth = async (url, newHeaders) => {
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
         ...newHeaders,
        'Access-Control-Allow-Origin': '*'
        // 'Content-Type': 'application/json' 
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
      "Please check your internet","Opps!", 3000
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
    if (
      error.response.data.message ===
      "Unauthorized, Your token is invalid or expired"
    ) {
      NotificationManager.error(
        "Your token is invalid or expired, please login","Opps!", 5000
      );
    }
    // console.log("token", token);
    return { er: error.response.data };
  }
};

export const httpPatch = async (url, postBody) => {
  if (!navigator.onLine) {
    return NotificationManager.error("Please check your internet","Opps!", 3000);
  }

  try {
    const res = await axios.patch(`${baseUrl}/${url}`, postBody, {
      headers: {'Content-Type': 'application/json'}
    });
    return res.data;

  } catch (error) {
    NotificationManager.error("Your token is invalid or expired, please login","Opps!", 5000);
    return { er: error.response.data };
  }
};

export const httpDelete = async (url) => {
  if (!navigator.onLine) {
    return NotificationManager.error(
      "Please check your internet", "Opps!", 3000
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
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};