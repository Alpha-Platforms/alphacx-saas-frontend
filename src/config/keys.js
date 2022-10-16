const {
    REACT_APP_AUTH_BASE_URL,
    REACT_APP_API_BASE_URL,
    REACT_APP_CLOUDINARY_BASE_URL,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_SOCKET_URL,
    REACT_APP_PAYSTACK_PUBLIC_KEY,
    REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    REACT_APP_API_CSRL_BASE_URL,
    REACT_APP_PLATFORM,
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
    paystackPublicKey: REACT_APP_PAYSTACK_PUBLIC_KEY,
    flutterwavePublicKey: REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    csrlBaseUrl: REACT_APP_API_CSRL_BASE_URL,
    platform: REACT_APP_PLATFORM,
};

export const esc = () => {};
