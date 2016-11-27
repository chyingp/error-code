import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { addErrorCode } from '../actions'

const errorCodes = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ERROR_CODE':
			alert('fuck');
			return state;
		default:
			return state;
	}
}

let initialState = {
	items: []
}

const reducer = handleActions({
	[addErrorCode]: (state, action) => ({
		...state,
		items: [...state.items, action.payload]
	})
}, initialState)

// const todoApp = combineReducers({
//   errorCodes
// })

export default reducer