import * as types from '../types';

const initialState = {
	statuses: [],
    meta: null,
	isStatusesLoading: false, //will be true when fetching data and back to false when the fetch is done
	isStatusesLoaded: false
}

//export the post reducer
const statusReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_STATUSES:
			return {
				...state,
				statuses: action.payload.statuses,
                meta: action.payload.meta,
				isStatusesLoading: false,
				isStatusesLoaded: true
				}
		case types.STATUSES_LOADING:
			return {
				...state,
				isStatusesLoading: true,
				isStatusesLoaded: false
			}
		case types.ADD_STATUS:
			return {
				...state
			}
		default:
			return state;
	}
}


export default statusReducer;