import * as types from '../types';

const initialState = {
	agents: [],
    meta: null,
	isAgentsLoading: false, //will be true when fetching data and back to false when the fetch is done
	isAgentsLoaded: false
}

//export the post reducer
const agentReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_AGENTS:
			return {
				...state,
				agents: action.payload.users,
                meta: action.payload.meta,
				isAgentsLoading: false,
				isAgentsLoaded: true
				}
		case types.AGENTS_LOADING:
			return {
				...state,
				isAgentsLoading: true,
				isAgentsLoaded: false
			}
		case types.ADD_AGENT:
			return {
				...state
			}
		default:
			return state;
	}
}


export default agentReducer;