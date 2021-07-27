import * as types from '../types';

const initialState = {
	customers: [],
    meta: null,
	isCustomersLoading: false, //will be true when fetching data and back to false when the fetch is done
	isCustomersLoaded: false,
	currentCustomer: null,
	isCurrentCustomerLoading: false,
	isCurrentCustomerLoaded: false
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
		case types.CURRENT_CUSTOMER_LOADING:
			return {
				...state,
				isCurrentCustomerLoading: true,
				isCurrentCustomerLoaded: false
			}
		case types.GET_CURRENT_CUSTOMER:
			return {
				...state,
				currentCustomer: action.payload,
				isCurrentCustomerLoading: false,
				isCurrentCustomerLoaded: true
			}
		default:
			return state;
	}
}


export default customerReducer;