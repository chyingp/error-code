import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from '../reducers'
import * as actions from '../actions'
import thunk from 'redux-thunk'

import App from '../components/App'
import Add from '../containers/Add'
import Edit from '../components/EditErrorCode'
import Search from '../containers/Search'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const thunkCreateStore = applyMiddleware(thunk)(createStore)
const store = thunkCreateStore(reducer)

const mapStateToProps = function(state){
	return state
}

const history = syncHistoryWithStore(browserHistory, store)

// const WrappedApp = connect(mapStateToProps, actions)(App)

// 参考：https://github.com/reactjs/react-router-redux

render(
  <Provider store={store}>
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="/add" component={Add}/>
			<Route path="/edit" component={Edit}/>
			<Route path="/search" component={Search}/>
      </Route>      
    </Router>      
  </Provider>,
  document.getElementById('root')
)
