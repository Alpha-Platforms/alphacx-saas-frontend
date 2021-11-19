import * as types from '../types';

const initialState = {
	slas: [],
    meta: null,
	isSlasLoading: false, //will be true when fetching data and back to false when the fetch is done
	isSlasLoaded: false
}

//export sla reducer
const slaReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SLAS:
            return {
				...state,
				slas: action.payload?.agreement,
                meta: action.payload?.meta || null,
				isSlasLoading: false,
				isSlasLoaded: true
			}
        case types.ADD_SLA:
			return {
				...state
			};
        case types.SLAS_LOADING:
			return {
				...state,
				isSlasLoading: true,
				isSlasLoaded: false
			}
        case types.UPDATE_SLA:
			return state;    
        default:
            return state;    
    }
}

export default slaReducer;