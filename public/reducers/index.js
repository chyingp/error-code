import { combineReducers } from 'redux'
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'

const errorCodes = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ERROR_CODE':
			alert('fuck');
			return state;
		default:
			return state;
	}
}

const todoApp = combineReducers({
  errorCodes
})

export default todoApp