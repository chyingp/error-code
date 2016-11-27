import React from 'react'
import { Button, Grid, Row, Col, Table } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

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
						</tr>
					</thead>
					<tbody>
						{props.items.map((item) =>
							<tr key={item._id}>
								<td>{item.code}</td>
								<td>{item.desc}</td>
								<td>{'-'}</td>
							</tr>
						)}	
					</tbody>
				</Table>						
			</Grid>
		)
	}
}

export default AddErrorCode;