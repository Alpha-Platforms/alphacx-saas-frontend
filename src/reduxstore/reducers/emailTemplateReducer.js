import * as types from '../types';

const initialState = {
	emailTemplates: [],
	isEmailTemplatesLoading: false, //will be true when fetching data and back to false when the fetch is done
	isEmailTemplatesLoaded: false,
	isEmailTemplatesCreated: false
}

//export the emailTemplateReducer reducer
const emailTemplateReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_EMAIL_TEMPLATES:
			return {
				...state,
				emailTemplates: action.payload || [],
				isEmailTemplatesLoading: false,
				isEmailTemplatesLoaded: true
			}
		case types.EMAIL_TEMPLATES_LOADING:
			return {
				...state,
				isEmailTemplatesLoading: true,
				isEmailTemplatesLoaded: false
			}
		case types.ADD_EMAIL_TEMPLATE:
			return {
				...state,
	            isEmailTemplatesCreated: true

			}
		default:
			return state;
	}
}

export default emailTemplateReducer;