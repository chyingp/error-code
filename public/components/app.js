import React from 'react';
import AddErrorCode from './AddErrorCode'
import ErrorCodeList from './ErrorCodeList'

class App extends React.Component {
	render() {
		const props = this.props;
		return (
			<div>
				<h1>错误码管理</h1>
				<AddErrorCode onAddClick={props.addErrorCode} />
				<ErrorCodeList items={props.items} />
			</div>
		)
	}
}

export default App;