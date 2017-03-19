import React from 'react';
import AddErrorCode from './AddErrorCode'
import ErrorCodeList from './ErrorCodeList'
import {
	Navbar,
	Nav,
	NavItem
} from 'react-bootstrap'

class App extends React.Component {

	componentDidMount() {
		console.log('App is mounted')
	}

	render() {
		const props = this.props;
		return (
			<div>				
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<span>错误码管理</span>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem eventKey="search" href="/search">错误码查询</NavItem>
						<NavItem eventKey="add" href="/add">新增错误码</NavItem>
						<NavItem eventKey="category" href="/category">分类管理</NavItem>
					</Nav>
				</Navbar>
				{this.props.children}
			</div>
		)
	}
}

export default App;