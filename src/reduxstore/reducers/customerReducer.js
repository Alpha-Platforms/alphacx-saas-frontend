import * as types from '../types';

const initialState = {
	customers: [],
    meta: null,
	isCustomersLoading: false, //will be true when fetching data and back to false when the fetch is done
	isCustomersLoaded: false
}

//export the post reducer
const customerReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CUSTOMERS:
			return {
				...state,
				customers: action.payload.users,
                meta: action.payload.meta,
				isCustomersLoading: false,
				isCustomersLoaded: true
				}
		case types.CUSTOMERS_LOADING:
			return {
				...state,
				isCustomersLoading: true,
				isCustomersLoaded: false
			}
		case types.ADD_CUSTOMER:
			return {
				...state
			}
		default:
			return state;
	}
}


export default customerReducer;