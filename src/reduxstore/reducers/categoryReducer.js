import * as types from '../types';

const initialState = {
	categories: [],
    meta: null,
	isCategoriesLoading: false, //will be true when fetching data and back to false when the fetch is done
	isCategoriesLoaded: false
}

//export the post reducer
const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CATEGORIES:
			return {
				...state,
				categories: action.payload.categories,
                meta: action.payload.meta,
				isCategoriesLoading: false,
				isCategoriesLoaded: true
				}
		case types.CATEGORIES_LOADING:
			return {
				...state,
				isCategoriesLoading: true,
				isCategoriesLoaded: false
			}
		case types.ADD_CATEGORY:
			return {
				...state
			}
		default:
			return state;
	}
}


export default categoryReducer;