import React from 'react'
import { Button, Grid, Row, Col, Table } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import moment from 'moment'

class AddErrorCode extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			code: ''
		}
		this.onInputChange = this.onInputChange.bind(this)
		this.onSearchClick = this.onSearchClick.bind(this)
	}

	componentDidMount() {
		this.props.getCategories()
	}

	onSearchClick() {
		let params = {}
		if(this.state.code) {
			params.code = this.state.code
		}
		this.props.queryErrorCode(params)
	}

	onInputChange(evt) {
		this.setState({
			code: evt.target.value.trim() 
		})
	}

	renderDateTime(created_at) {
		return created_at ? moment(created_at).format('YYYY-MM-DD  HH:mm:ss') : '-'
	}

	render() {

		const props = this.props;

		return (
			<div className="show-grid">				
				<Table striped bordered condensed hover> 
					<thead>
						<tr>
							<th>分类名称</th>
							<th>分类描述</th>
							<th>创建时间</th>
						</tr>
					</thead>
					<tbody>
						{props.items.map((item) =>
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.desc}</td>
								<td>{this.renderDateTime(item.created_at)}</td>
							</tr>
						)}	
					</tbody>
				</Table>						
			</div>
		)
	}
}

export default AddErrorCode;