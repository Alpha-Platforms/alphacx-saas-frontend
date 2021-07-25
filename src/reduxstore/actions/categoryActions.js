import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getCategories = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setCategoriesLoading());
	axios.get(`${config.stagingBaseUrl}/categories?per_page=50`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_CATEGORIES,
			payload: res.data && res.data.status === "success" ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addCategory = (newCategory) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newCategory);

	axios.post(`${config.stagingBaseUrl}/categories`, body, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.ADD_CATEGORY,
			payload: res.data
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}


export const setCategoriesLoading = () => {
	return {
		type: types.CATEGORIES_LOADING
	}
}