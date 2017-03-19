import { createAction } from 'redux-actions';
import 'whatwg-fetch'
import { stringify } from 'querystring'

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

	fetch('/service/category/add', {
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

export let getCategories = (options = {}) => (dispatch) => {

	dispatch( getCategoriesPending() )

	fetch('/service/category/query?' + stringify(options))
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		dispatch( getCategoriesSuccess(data) )
	})
}

// 分类管理 - 删除分类
export let removeCategoryPending = () => ({
	type: 'REMOVE_CATEGORY_PENDING'
})

export let removeCategorySuccess = (data) => ({
	type: 'REMOVE_CATEGORY_SUCCESS',
	payload: data
})

export let removeCategoryError = (data) => ({
	type: 'REMOVE_CATEGORY_ERROR',
	payload: data
})

export let removeCategory = (options = {}) => (dispatch) => {

	dispatch( removeCategoryPending() )

	// fetch('/service/category/del?' + stringify(options))
	// .then((response) => {
	// 	return response.json()
	// })
	// .then((data) => {
	// 	dispatch( removeCategorySuccess(options) )
	// })

	fetch('/service/category/del', {
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
		dispatch( removeCategorySuccess(options) )
	});	
}

// 分类管理 - 编辑分类
export let startEditCategory = (item) => ({
	type: 'START_EDIT_CATEGORY',
	payload: item
})

export let stopEditCategory = (item) => ({
	type: 'STOP_EDIT_CATEGORY',
	payload: item
})

export let modCategoryPending = (item) => ({
	type: 'MOD_CATEGORY_PENDING',
	payload: item
})

export let modCategorySuccess = (item) => ({
	type: 'MOD_CATEGORY_SUCCESS',
	payload: item
})

export let modCategoryError = (item) => ({
	type: 'MOD_CATEGORY_ERROR',
	payload: item
})

export let modCategory = (options = {}) => (dispatch) => {

	dispatch( modCategoryPending() )

	fetch('/service/category/mod', {
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
		dispatch( modCategorySuccess(options) )
	});	
}