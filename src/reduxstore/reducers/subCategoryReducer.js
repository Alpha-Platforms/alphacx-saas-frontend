import * as types from '../types';

const initialState = {
	subCategories: [],
    meta: null,
	isSubCategoriesLoading: false, //will be true when fetching data and back to false when the fetch is done
	isSubCategoriesLoaded: false
}

//export the post reducer
const subCategoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_SUB_CATEGORIES:
			return {
				...state,
				subCategories: action.payload.categories,
                meta: action.payload.meta,
				isSubCategoriesLoading: false,
				isSubCategoriesLoaded: true
				}
		case types.SUB_CATEGORIES_LOADING:
			return {
				...state,
				isSubCategoriesLoading: true,
				isSubCategoriesLoaded: false
			}
		case types.ADD_SUB_CATEGORY:
			return {
				...state
			}
		default:
			return state;
	}
}


export default subCategoryReducer;