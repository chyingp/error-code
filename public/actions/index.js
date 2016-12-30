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