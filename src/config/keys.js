const {
    REACT_APP_AUTH_BASE_URL,
    REACT_APP_API_BASE_URL,
    REACT_APP_CLOUDINARY_BASE_URL,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_SOCKET_URL,
} = process.env;

export const config = {
    authBaseUrl: REACT_APP_AUTH_BASE_URL,
    stagingBaseUrl: REACT_APP_API_BASE_URL,
    localStorageTenantTokenId: 'alphacxtenanttoken',
    localStorageUserTokenId: 'alphacxauthtoken',
    customersPerPage: 4,
    cloudinaryBaseUrl: REACT_APP_CLOUDINARY_BASE_URL,
    cloudinaryUploadPreset: REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    cloudinaryCloudName: REACT_APP_CLOUDINARY_CLOUD_NAME,
    socketUrl: REACT_APP_SOCKET_URL,
};

export const esc = () => {};
