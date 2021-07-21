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
    const userToken = getState().userAuth.userToken;

    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If tenantToken, add to headers
    if (userToken) {
        axiosConfig.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return axiosConfig;
}