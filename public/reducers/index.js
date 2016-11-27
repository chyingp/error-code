import { combineReducers } from 'redux'
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'

const errorCodes = (state = [], action) => {
	switch (action.type) {
		default:
			return state;
	}
}

const todoApp = combineReducers({
  errorCodes
})

export default errorCodes