import { createAction } from 'redux-actions';
import 'whatwg-fetch'

// export const addErrorCode = (code, desc) => ({
// 	type: 'ADD_ERROR_CODE',
// 	payload: {
// 		code,
// 		desc
// 	}
// })

// export let addErrorCode = createAction('ADD_ERROR_CODE')

export let fetchedErrorCode = (data) => ({
	type: 'FETCHED_ERROR_CODE',
	payload: data
})

export let queryErrorCode = (options) => ((dispatch) => {
	fetch('/api/ec/query')
		.then(function(response) {
			return response.json()
		}).then(function(body) {
			dispatch( fetchedErrorCode(body) )
		});
})

export let addErrorCode =(options) => ({
	type: 'ADD_ERROR_CODE',
	payload: options
})

// export let addErrorCode = (options) => ((dispatch) => ({
// 	fetch('/api/ec/query')
// 		.then(function(response) {
// 			return response.json()
// 		}).then(function(body) {
// 			dispatch( fetchedErrorCode(body.data) )
// 		});
// }))


// export addErrorCode