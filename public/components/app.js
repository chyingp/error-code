import React from 'react';
import AddErrorCode from './AddErrorCode'

class App extends React.Component {
	render() {
		const props = this.props;
		return (
			<div>
				<h1>错误码管理</h1>
				<AddErrorCode onAddClick={props.addErrorCode} />
			</div>
		)
	}
}

export default App;