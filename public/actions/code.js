import 'whatwg-fetch'
import { stringify } from 'querystring'

// export let removeErrorCode = (data) => ({
// 	type: 'REMOVE_ERROR_CODE',
// 	payload: data
// })

export let removeErrorCodePending = (data) => ({
	type: 'REMOVE_ERROR_CODE_PENDING',
	payload: data
})

export let removeErrorCodeSuccess = (data) => ({
	type: 'REMOVE_ERROR_CODE_SUCCESS',
	payload: data
})

export let removeErrorCodeError = (data) => ({
	type: 'REMOVE_ERROR_CODE_ERROR',
	payload: data
})

export let removeErrorCode = (_id = "") => ((dispatch) => {
	dispatch( removeErrorCodePending() )

	fetch('/service/code/del', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			_id: _id
		})
	})
	.then(function(response){
		return response.json();
	})
	.then(function(data) {
		if(data.ret_code === '0') {
			dispatch( removeErrorCodeSuccess(data.data) )
		}else {
			dispatch( removeErrorCodeError(data) )
		}	
	});
})

// 修改错误码（修改中）
export let modErrorCodePending = (data) => ({
	type: 'MOD_ERROR_CODE_PENDING',
	payload: data
})

// 修改错误码（修改成功）
export let modErrorCodeSuccess = (data) => ({
	type: 'MOD_ERROR_CODE_SUCCESS',
	payload: data
})

// 修改错误码（修改失败）
export let modErrorCodeError = (data) => ({
	type: 'MOD_ERROR_CODE_ERROR',
	payload: data
})

// 修改错误码
export let modErrorCode = (_id = "") => ((dispatch) => {
	dispatch( modCodePending() )

	fetch('/service/code/mod', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			_id: _id
		})
	})
	.then(function(response){
		return response.json();
	})
	.then(function(data) {
		if(data.ret_code === '0') {
			dispatch( modErrorCodeSuccess(data.data) )
		}else {
			dispatch( modErrorCodeError(data) )
		}	
	});
})

export let queryErrorCode = (options = {}) => ((dispatch) => {
	fetch('/service/code/query?' + stringify(options) )
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

	fetch('/service/code/add', {
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
		if(data.ret_code === '0') {
			dispatch( addErrorCodeSuccess(data.data) )
		}else {
			dispatch( addErrorCodeError(data.data) )
		}		
	});
}

// 查询错误码详情
export let queryErrorCodeDetailSuccess = (data) => ({
	type: 'QUERY_ERROR_CODE_DETAIL_SUCCESS',
	payload: data.items[0]
})

export let queryErrorCodeDetail = (options = {_id: ''}) => ((dispatch) => {
	fetch('/service/code/query?' + stringify(options) )
		.then(function(response) {
			return response.json()
		}).then(function(data) {
			if(data.ret_code === '0') {
				dispatch( queryErrorCodeDetailSuccess(data.data) )
			}
			// dispatch( fetchedErrorCode(body.data) )
		});
})