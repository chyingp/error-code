import { createAction } from 'redux-actions';
import 'whatwg-fetch'
import { stringify } from 'querystring'

export let fetchedErrorCode = (data) => ({
	type: 'FETCHED_ERROR_CODE',
	payload: data
})

export let queryErrorCode = (options = {}) => ((dispatch) => {
	fetch('/api/ec/query?' + stringify(options) )
		.then(function(response) {
			return response.json()
		}).then(function(body) {
			dispatch( fetchedErrorCode(body.data) )
		});
})

export let addErrorCodeSuccess = (data) => ({
	type: 'ADD_ERROR_CODE_SUCCESS',
	payload: data
})

export let addErrorCodeError = (data) => ({
	type: 'ADD_ERROR_CODE_ERROR',
	payload: data
})

export let addErrorCodePending = () => ({
	type: 'ADD_ERROR_CODE_PENDING'
})

export let addErrorCode =(options) => (dispatch) => {

// 	dispatch( addErrorCodeError() )
// return;
	dispatch( addErrorCodePending() )

	fetch('/api/ec/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(options)
	})
	.then(function(response){
		return response.json();
	})
	.then(function(data) {
		dispatch( addErrorCodeSuccess(data.data) )
	});
}

// 分类管理 - 新增分类
export let addCategoryPending = () => ({
	type: 'ADD_CATEGORY_PENDING'
})

export let addCategorySuccess = (data) => ({
	type: 'ADD_CATEGORY_SUCCESS',
	payload: data
})

export let addCategoryError = (data) => ({
	type: 'ADD_CATEGORY_ERROR',
	payload: data
})

export let addCategory = (options) => (dispatch) => {

	dispatch( addCategoryPending() )

	fetch('/api/category/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(options)
	})
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		dispatch( addCategorySuccess(data) )
	})
}

// 分类管理 - 查询分类
export let getCategoriesPending = () => ({
	type: 'GET_CATEGORIES_PENDING'
})

export let getCategoriesSuccess = (data) => ({
	type: 'GET_CATEGORIES_SUCCESS',
	payload: data
})

export let getCategoriesError = (data) => ({
	type: 'GET_CATEGORIES_ERROR',
	payload: data
})

export let getCategories = (options) => (dispatch) => {

	dispatch( getCategoriesPending() )

	fetch('/api/category/query', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(options)
	})
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		dispatch( getCategoriesSuccess(data) )
	})
}