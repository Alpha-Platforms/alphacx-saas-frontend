import * as types from '../types';

const initialState = {
	admins: null,
    meta: null,
	isAdminsLoading: false, //will be true when fetching data and back to false when the fetch is done
	isAdminsLoaded: false,
	currentAdmin: null,
	isCurrentAdminLoading: false,
	isCurrentAdminLoaded: false,
}

//export the post reducer
const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ADMINS:
			return {
				...state,
				admins: action.payload.users || [],
                meta: action.payload.meta || null,
				isAdminsLoading: false,
				isAdminsLoaded: true
				}
		case types.ADMINS_LOADING:
			return {
				...state,
				isAdminsLoading: true,
				isAdminsLoaded: false
			}
		case types.CURRENT_ADMIN_LOADING:
			return {
				...state,
				isCurrentAdminLoading: true,
				isCurrentAdminLoaded: false
			}
		case types.GET_CURRENT_ADMIN:
			return {
				...state,
				currentAdmin: action.payload,
				isCurrentAdminLoading: false,
				isCurrentAdminLoaded: true
			}
		case types.ADMINS_LOADING_FAILED:
			return {
				...state,
				isAdminsLoading: false,
				isAdminsLoaded: true
			}
		default:
			return state;
	}
}


export default adminReducer;