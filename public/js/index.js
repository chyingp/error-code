import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import App from '../components/App'
import reducer from '../reducers'
import * as actions from '../actions'
import thunk from 'redux-thunk'

const thunkCreateStore = applyMiddleware(thunk)(createStore)
const store = thunkCreateStore(reducer)

const mapStateToProps = function(state){
	return state
}

const WrappedApp = connect(mapStateToProps, actions)(App)

render(
  <Provider store={store}>
    <WrappedApp />
  </Provider>,
  document.getElementById('root')
)
