import * as types from '../types';

const initialState = {
	priorities: [],
    meta: null,
	isPrioritiesLoading: false, //will be true when fetching data and back to false when the fetch is done
	isPrioritiesLoaded: false
}

//export the post reducer
const priorityReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_PRIORITIES:
			return {
				...state,
				priorities: action.payload.priorities,
                meta: action.payload.meta,
				isPrioritiesLoading: false,
				isPrioritiesLoaded: true
				}
		case types.PRIORITIES_LOADING:
			return {
				...state,
				isPrioritiesLoading: true,
				isPrioritiesLoaded: false
			}
		default:
			return state;
	}
}


export default priorityReducer;