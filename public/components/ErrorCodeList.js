import React from 'react'
import { Button, Grid, Row, Col, Table } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel, ButtonToolbar } from 'react-bootstrap'
import moment from 'moment'
import { browserHistory } from 'react-router'

class AddErrorCode extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			code: ''
		}
		this.onInputChange = this.onInputChange.bind(this)
		this.onSearchClick = this.onSearchClick.bind(this)
		this.onEditCode = this.onEditCode.bind(this)
		this.onDelCode = this.onDelCode.bind(this)
	}

	componentDidMount() {
		this.props.queryErrorCode()
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

	onEditCode (item) {
		browserHistory.push(`/edit/${item._id}`)
	}

	onDelCode (item) {
		this.props.removeErrorCode(item._id)	
	}

	renderDateTime(created_at) {
		return created_at ? moment(created_at).format('YYYY-MM-DD  HH:mm:ss') : '-'
	}

	render() {

		const props = this.props;

		return (
			<Grid className="show-grid">
				<Form inline className="search-form">
				    <FormGroup controlId="formInlineName">
				    	<FormControl type="text" placeholder="错误码" onChange={this.onInputChange} />
				    </FormGroup>
				    <Button bsStyle="primary" className="search-btn" onClick={this.onSearchClick}>查询</Button>
				</Form>    
				<Table striped bordered condensed hover> 
					<thead>
						<tr>
							<th>错误码</th>
							<th>错误描述</th>
							<th>创建时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{props.items.map((item) =>
							<tr key={item._id}>
								<td>
									{/*<input type="text" className="form-control" value={item.code} />*/}
									{item.code}
								</td>
								<td>
									{/*<input type="text" className="form-control" value={item.brief_desc} />*/}
									{item.brief_desc}
								</td>
								<td>{this.renderDateTime(item.created_at)}</td>
								<td>
									<ButtonToolbar>
										<Button bsSize="sm" onClick={this.onEditCode.bind(this, item)}>编辑</Button>									
										<Button bsSize="sm" onClick={this.onDelCode.bind(this, item)}>删除</Button>
									</ButtonToolbar>	
								</td>
							</tr>
						)}	
					</tbody>
				</Table>						
			</Grid>
		)
	}
}

export default AddErrorCode;