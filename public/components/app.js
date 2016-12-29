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
		// this.props.queryErrorCode()
	}

	render() {
		const props = this.props;
		return (
			<div>
				{/*<h1 style={{textAlign: 'center', marginBottom: '20px'}}>错误码管理</h1>*/}
				{/*<AddErrorCode onAddClick={props.addErrorCode} onSearchClick={props.queryErrorCode} />
				<ErrorCodeList items={props.items} />*/}
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">错误码管理</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem eventKey="search" href="/search">查询</NavItem>
						<NavItem eventKey="add" href="/add">新增</NavItem>
						<NavItem eventKey="category" href="/category">分类管理</NavItem>
					</Nav>
				</Navbar>
				{this.props.children}
			</div>
		)
	}
}

export default App;