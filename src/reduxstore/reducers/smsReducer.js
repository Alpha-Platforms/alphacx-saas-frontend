import * as types from '../types';

const initialState = {
	smsConfig: {},
	isConfigLoading: false,
    isConfigLoaded: false
}

//export the post reducer
const tagReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_SMS_CONFIG:
			return {
				...state,
				smsConfig: action.payload,
				isConfigLoading: false,
				isConfigLoaded: true
				}
		case types.SMS_CONFIG_LOADING:
			return {
				...state,
				isConfigLoading: true,
				isConfigLoaded: false
			}
		case types.UPDATE_SMS_CONFIG:
			return state;
		default:
			return state;
	}
}


export default tagReducer;