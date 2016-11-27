import React from 'react'
import { Button, Grid, Col } from 'react-bootstrap'

class AddErrorCode extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			code: '',
			desc: ''
		}

		this.onAddClick = this.onAddClick.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleInputChange(key, evt) {
		this.setState({
			[key]: evt.target.value.trim()
		})
	}

	onAddClick() {
		this.props.onAddClick(this.state.code, this.state.desc)
	}

	render() {
		return (
			<Grid className="show-grid">
				<h2>新增错误码</h2>
				<Col xs={4}>
					<input
						ref="code"
						type="text"
						className="form-control"
						placeholder="错误码"
						value={this.state.code}
						onChange={this.handleInputChange.bind(this, 'code')}
						/>
				</Col>
				<Col xs={4}>
					<input
						ref="desc"
						type="text"
						className="form-control"
						placeholder="错误描述"
						value={this.state.desc} 
						onChange={this.handleInputChange.bind(this, 'desc')}
						/>
				</Col>
				<Col xs={4}>
					<Button	bsStyle="primary" onClick={this.onAddClick}>新增</Button>
				</Col>				
			</Grid>
		)
	}
}

export default AddErrorCode;