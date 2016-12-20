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

// let initialState = {
// 	items: []
// }

// const reducer = handleActions({
// 	[addErrorCode]: (state, action) => ({
// 		...state,
// 		items: [...state.items, action.payload]
// 	})
// }, initialState)

const reducer = combineReducers({
	code: errorCode,
	items: errorCodes,
	routing: routerReducer
})

export default reducer