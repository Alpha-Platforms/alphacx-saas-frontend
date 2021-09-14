import * as types from '../types';

const initialState = {
	supervisors: null,
    meta: null,
	isSupervisorsLoading: false, //will be true when fetching data and back to false when the fetch is done
	isSupervisorsLoaded: false,
	currentSupervisor: null,
	isCurrentSupervisorLoading: false,
	isCurrentSupervisorLoaded: false,
}

//export the post reducer
const supervisorReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_SUPERVISORS:
			return {
				...state,
				supervisors: action.payload.users || [],
                meta: action.payload.meta || null,
				isSupervisorsLoading: false,
				isSupervisorsLoaded: true
				}
		case types.SUPERVISORS_LOADING:
			return {
				...state,
				isSupervisorsLoading: true,
				isSupervisorsLoaded: false
			}
		case types.CURRENT_SUPERVISOR_LOADING:
			return {
				...state,
				isCurrentSupervisorLoading: true,
				isCurrentSupervisorLoaded: false
			}
		case types.GET_CURRENT_SUPERVISOR:
			return {
				...state,
				currentSupervisor: action.payload,
				isCurrentSupervisorLoading: false,
				isCurrentSupervisorLoaded: true
			}
		default:
			return state;
	}
}


export default supervisorReducer;