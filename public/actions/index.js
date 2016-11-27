import { createAction } from 'redux-actions';

// export const addErrorCode = (code, desc) => ({
// 	type: 'ADD_ERROR_CODE',
// 	payload: {
// 		code,
// 		desc
// 	}
// })

export let addErrorCode = createAction('ADD_ERROR_CODE')

// export addErrorCode