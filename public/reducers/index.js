import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { addErrorCode } from '../actions'

const errorCodes = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ERROR_CODE':
			return [state.items, action.payload];
		case 'FETCHED_ERROR_CODE':
			return action.payload.items;
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
  items: errorCodes
})

export default reducer