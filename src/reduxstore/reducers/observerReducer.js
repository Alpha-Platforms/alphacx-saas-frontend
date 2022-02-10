import * as types from '../types';

const initialState = {
	observers: [],
    meta: null,
	isObserversLoading: false, //will be true when fetching data and back to false when the fetch is done
	isObserversLoaded: false,
}

//export the post reducer
const observerReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_OBSERVERS:
			return {
				...state,
				observers: action.payload?.users || [],
                meta: action.payload?.meta || null,
				isObserversLoading: false,
				isObserversLoaded: true
				}
            case types.OBSERVERS_LOADING:
                return {
                    ...state,
                    isObserversLoading: true,
                    isObserversLoaded: false
                }
		case types.OBSERVERS_LOADING_FAILED:
			return {
				...state,
				isObserversLoading: false,
				isObserversLoaded: true
			}
		default:
			return state;
	}
}


export default observerReducer;