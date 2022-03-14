import * as types from '../types';

const initialState = {
	categories: [],
	pagCategories: [],
    meta: null,
    pagMeta: null,
	isCategoriesLoading: false, //will be true when fetching data and back to false when the fetch is done
	isCategoriesLoaded: false,
	isPagCategoriesLoading: false,
	isPagCategoriesLoaded: false,
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
		case types.GET_PAG_CATEGORIES:
			return {
				...state,
				pagCategories: action.payload.categories,
				pagMeta: action.payload.meta,
				isPagCategoriesLoading: false,
				isPagCategoriesLoaded: true
				}
		case types.PAG_CATEGORIES_LOADING:
			return {
				...state,
				isPagCategoriesLoading: true,
				isPagCategoriesLoaded: false
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