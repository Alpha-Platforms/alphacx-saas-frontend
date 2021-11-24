import * as types from '../types';

const initialState = {
	emailTemplates: [],
	currentEmailTemplate: null,
	isEmailTemplatesLoading: false, //will be true when fetching data and back to false when the fetch is done
	isEmailTemplatesLoaded: false,
	isEmailTemplatesCreated: false,
    isCurrentEmailTemplateLoading: false,
	isCurrentEmailTemplateLoaded: false,
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
        case types.CURRENT_EMAIL_TEMPLATE_LOADING:
			return {
				...state,
				isCurrentEmailTemplateLoading: true,
				isCurrentEmailTemplateLoaded: false
			}
		case types.GET_CURRENT_EMAIL_TEMPLATE:
			return {
				...state,
				currentEmailTemplate: action.payload,
				isCurrentEmailTemplateLoading: false,
				isCurrentEmailTemplateLoaded: true
			}
		default:
			return state;
	}
}

export default emailTemplateReducer;