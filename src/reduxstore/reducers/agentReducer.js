import * as types from '../types';

const initialState = {
	agents: [],
    meta: null,
	isAgentsLoading: false, //will be true when fetching data and back to false when the fetch is done
	isAgentsLoaded: false,
	isAgentCreated: false,
	currentAgent: null,
	isCurrentAgentLoading: false,
	isCurrentAgentLoaded: false,
}

//export the post reducer
const agentReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_AGENTS:
			return {
				...state,
				agents: action.payload.users || [],
                meta: action.payload.meta || null,
				isAgentsLoading: false,
				isAgentsLoaded: true
				}
		case types.AGENTS_LOADING:
			return {
				...state,
				isAgentsLoading: true,
				isAgentsLoaded: false
			}
		case types.AGENTS_LOADING_FAILED:
			return {
				...state,
				isAgentsLoading: false,
				isAgentsLoaded: true
			}
		case types.ADD_AGENT:
			return {
				...state,
				isAgentCreated: true
			}
		case types.RESET_AGENT_CREATED:
			return {
				...state,
				isAgentCreated: false
			}
		case types.CURRENT_AGENT_LOADING:
			return {
				...state,
				isCurrentAgentLoading: true,
				isCurrentAgentLoaded: false
			}
		case types.GET_CURRENT_AGENT:
			return {
				...state,
				currentAgent: action.payload,
				isCurrentAgentLoading: false,
				isCurrentAgentLoaded: true
			}
		case types.NEGATE_STATE:
			return {
				...state,
				agents: state.agents.map(agent => {
					if (agent.id === action.payload) {
						return {...agent, isActivated: !agent.isActivated};
					} else {
						return agent;
					}
				})
			}
		default:
			return state;
	}
}


export default agentReducer;