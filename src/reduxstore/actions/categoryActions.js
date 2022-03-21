import { customAxios as axios } from "../../helper";
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';
import store from '../store';
import {NotificationManager} from 'react-notifications';

const {getState} = store;


export const getCategories = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setCategoriesLoading());
	axios.get(`${config.stagingBaseUrl}/categories?per_page=100`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_CATEGORIES,
			payload: res.data && res.data.status === "success" ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}

export const getPaginatedCategories = (itemsPerPage, currentPage, success, failed) => (dispatch, getState) => {
    if (!navigator.onLine) {
        return console.error("Network error!");
    }
    dispatch(setPagCategoriesLoading());
    axios
        .get(`${config.stagingBaseUrl}/categories?per_page=${itemsPerPage}&page=${currentPage}`, userTokenConfig(getState))
        .then(res => {
            dispatch({
                type: types.GET_PAG_CATEGORIES,
                payload: (res.data && res.data.status === "success")
                    ? res.data?.data
                    : {}
            });
            success && success();
        })
        .catch(err => {
            dispatch({
                type: types.GET_PAG_CATEGORIES,
                payload: {
                    meta: {
                        totalItems:"0",
                        itemsPerPage: 50,
                        currentPage: 1,
                        totalPages: 0
                    }
                }
            });
            failed && failed();
            dispatch(returnErrors(err.response?.data, err.response?.status))});
}

export const addCategory = (newCategory) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newCategory);

	axios.post(`${config.stagingBaseUrl}/categories`, body, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.ADD_CATEGORY,
			payload: res.data
		}))
		.catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));

}

// invalid redux action
export const getSubCategory = async (categoryId) => {

	try {
        const res = await axios.get(`${config.stagingBaseUrl}/sub-categories/${categoryId}`, userTokenConfig(getState));
        return res.data;
    } catch (err) {
        NotificationManager.error(err?.response?.data.message, 'Error');
        return err?.response?.data;
    }
}


export const updateCategory = (catInfo, success, failed) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify({name: catInfo.name});

	axios.patch(`${config.stagingBaseUrl}/categories/${catInfo.id}`, body, userTokenConfig(getState))
		.then(res => {
			if(res.data && res.data?.status === "success") {
				success && success();
			} else {
				failed && failed();
			}
		})
		.catch(err => {
			dispatch(returnErrors(err.response?.data, err.response?.status));
			failed && failed();
		});

}


export const setCategoriesLoading = () => {
	return {
		type: types.CATEGORIES_LOADING
	}
}

export const setPagCategoriesLoading = () => {
	return {
		type: types.PAG_CATEGORIES_LOADING
	}
}