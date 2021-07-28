import * as types from '../types';

const initialState = {
	groups: [],
	isGroupsLoading: false, //will be true when fetching data and back to false when the fetch is done
	isGroupsLoaded: false
}

//export the post reducer
const groupReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_GROUPS:
			return {
				...state,
				groups: action.payload,
				isGroupsLoading: false,
				isGroupsLoaded: true
				}
		case types.GROUPS_LOADING:
			return {
				...state,
				isGroupsLoading: true,
				isGroupsLoaded: false
			}
		default:
			return state;
	}
}


export default groupReducer;