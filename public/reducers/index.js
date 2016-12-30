import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { addErrorCode } from '../actions'
import { routerReducer } from 'react-router-redux'

const errorCodes = (state = [], action) => {
	switch (action.type) {
		// case 'ADD_ERROR_CODE':
		// 	return [state.items, action.payload]
		case 'FETCHED_ERROR_CODE':
			return action.payload.items
		case 'ADD_ERROR_CODE_SUCCESS':
			return [ action.payload, ...state ]	
		default:
			return state;
	}
}

let initialState = {
	status: '',
	errMsg: ''
}

const errorCode = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_ERROR_CODE':
			return action.payload;
		case 'ADD_ERROR_CODE_PENDING':
			return {
				...state,
				status: 'pending'
			};	
		case 'ADD_ERROR_CODE_SUCCESS':
			return {
				...state,
				status: 'success'
			};
		case 'ADD_ERROR_CODE_ERROR':
			return {
				...state,
				status: 'error'
			};	
		default:
			return state;	
	}
}

let categoryInitialState = {
	status: '',
	errMsg: ''
}

const category = (state = categoryInitialState, action) => {
	switch (action.type) {		
		case 'ADD_CATEGORY_PENDING':
			return {
				...state,
				status: 'pending'
			};	
		case 'ADD_CATEGORY_SUCCESS':
			return {
				...state,
				status: 'success'
			};
		case 'ADD_CATEGORY_ERROR':
			return {
				...state,
				status: 'error'
			};	
		default:
			return state;	
	}
}

// 分类列表
let categoriesInitialState = {
	status: '',
	items: []
}

const categories = (state = categoriesInitialState, action) => {
	switch (action.type) {		
		case 'GET_CATEGORIES_PENDING':
			return {
				...state,
				status: 'pending'
			};	
		case 'GET_CATEGORIES_SUCCESS':
			return {
				...state,
				...action.payload.data,
				status: 'success'
			};
		case 'GET_CATEGORIES_ERROR':
			return {
				...state,
				status: 'error'
			};	
		case 'REMOVE_CATEGORY_SUCCESS':
			return {
				...state,
				items: state.items.filter((item) => item._id !== action.payload._id)
			}	
		default:
			return state;	
	}
}

let editCategoryInitialState = {
	item: {},
	show: false,
	status: ''
}

const editingCategory = (state = editCategoryInitialState, action) => {
	switch(action.type) {
		case 'START_EDIT_CATEGORY':
			return {
				...state,
				show: true,
				item: action.payload
			}
		case 'STOP_EDIT_CATEGORY':
			return {
				...state,
				show: false,
				item: {}
			}	
		case 'MOD_CATEGORY_PENDING':
			return {
				...state,
				status: 'pending'
			}
		case 'MOD_CATEGORY_SUCCESS':
			return {
				...state,
				show: false,
				status: 'success'
			}
		case 'MOD_CATEGORY_ERROR':
			return {
				...state,
				status: 'error'
			}	
		default:
			return state
	}
}

const reducer = combineReducers({
	category: category,  // 分类
	categories: categories,  // 分类列表
	editingCategory: editingCategory,
	code: errorCode,
	items: errorCodes,
	routing: routerReducer
})

export default reducer