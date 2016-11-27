import React from 'react'
import { ButtonToolbar, Button, Grid, Col } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

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
		const code = this.state.code
		const desc = this.state.desc
		
		if(!code || !desc) {
			alert('错误码/错误描述 不能为空');
			return;
		}

		if(!/^\d+$/.test(code)) {
			alert('错误码必须是整数');
			return;
		}

		this.props.addErrorCode({
			code: this.state.code, 
			desc: this.state.desc
		})
	}

	render() {
		return (
			<Grid className="show-grid">
				<Form inline className="add-form">
				    <FormGroup controlId="formInlineName">
				    	<FormControl
				    		className="code-input mg-r"
				    		type="text"
				    		placeholder="错误码"				    		
				    		value={this.state.code}
							onChange={this.handleInputChange.bind(this, 'code')}
				    	/>
				    	<FormControl
				    		className="desc-input mg-r"
				    		type="text"
				    		placeholder="错误描述"				    		
				    		value={this.state.desc}
							onChange={this.handleInputChange.bind(this, 'desc')}
				    	/>
				    </FormGroup>
				    <Button
				    	className="mg-r"
				    	bsStyle="primary"
				    	className="search-btn"
				    	onClick={this.onAddClick}>新增</Button>
				</Form>						
			</Grid>
		)
	}
}

export default AddErrorCode;