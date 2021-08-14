import * as types from '../types';

const initialState = {
	tags: {},
	isTagsLoading: false, //will be true when fetching data and back to false when the fetch is done
	isTagsLoaded: false
}

//export the post reducer
const tagReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_TAGS:
			return {
				...state,
				tags: action.payload,
				isTagsLoading: false,
				isTagsLoaded: true
				}
		case types.TAGS_LOADING:
			return {
				...state,
				isTagsLoading: true,
				isTagsLoaded: false
			}
		default:
			return state;
	}
}


export default tagReducer;