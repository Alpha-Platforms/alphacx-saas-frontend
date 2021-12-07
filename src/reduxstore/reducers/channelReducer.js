import * as types from '../types';

const initialState = {
	channels: [],
	isChannelsLoading: false, //will be true when fetching data and back to false when the fetch is done
	isChannelsLoaded: false
}

//export the post reducer
const channelReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CHANNELS:
			return {
				...state,
				channels: action.payload,
				isChannelsLoading: false,
				isChannelsLoaded: true
				}
		case types.ADD_CHANNEL:
			return {
				...state,
				channels: [
					...state.channels,
					action.payload
				]
			};
		case types.UPDATE_CHANNEL:
			let updatedArray = state.channels.filter( el => el.id !== action.payload.id ); 
			return {
				...state,
				channels: [
					...updatedArray,
					action.payload
				]
			};	
		case types.CHANNELS_LOADING:
			return {
				...state,
				isChannelsLoading: true,
				isChannelsLoaded: false
			}
		default:
			return state;
	}
}


export default channelReducer;