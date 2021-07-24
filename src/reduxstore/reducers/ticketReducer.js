import * as types from '../types';

const initialState = {
	tickets: [],
    meta: null,
	isTicketsLoading: false, //will be true when fetching data and back to false when the fetch is done
	isTicketsLoaded: false,
	isTicketsFullyLoaded: false
}

//export the post reducer
const ticketReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_TICKETS:
			return {
				...state,
				tickets: action.payload.tickets,
                meta: action.payload.meta,
				isTicketsLoading: false,
				isTicketsLoaded: true,
				isTicketsFullyLoaded: true
				}
		case types.TICKETS_LOADING:
			return {
				...state,
				isTicketsLoading: true,
				isTicketsLoaded: false
			}
		case types.ADD_TICKET:
			return {
				...state
			}
		default:
			return state;
	}
}


export default ticketReducer;