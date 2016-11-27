import React from 'react'
import { Button, Grid, Col, Table } from 'react-bootstrap'

class AddErrorCode extends React.Component {

	constructor(props){
		super(props)
	}

	handleInputChange(key, evt) {
		this.setState({
			[key]: evt.target.value.trim()
		})
	}

	onAddClick() {
		this.props.onAddClick({
			code: this.state.code, 
			desc: this.state.desc
		})
	}

	render() {
		const props = this.props;
		return (
			<Grid className="show-grid">
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