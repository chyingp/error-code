import React from 'react'
import { 
	ButtonToolbar,
	Button,
	Grid,
	Col,
	Form, 
	FormGroup,
	FormControl,
	ControlLabel,
	Panel,
	Alert
} from 'react-bootstrap'

class AddErrorCode extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			code: '',
			brief_desc: '',
			verbose_desc: '',
			showErrMsg: false,
			errMsg: ''
		}

		this.onAddClick = this.onAddClick.bind(this)		
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		let props = this.props
		let nextStatus = nextProps.status
		let msg = ''
		
		if( nextStatus !== props.status && ['success', 'error'].indexOf(nextStatus)!== -1 ) {
			switch(nextStatus){
				case 'success':
					msg = '错误添加成功'
					break;
				case 'error':
					msg = '错误码添加失败'
					break;
				default:
					// doing nothing
					break;	 	
			}

			this.setState({
				showErrMsg: true,
				errMsg: msg
			})
		}
	}

	handleInputChange(key, evt) {
		this.setState({
			[key]: evt.target.value.trim()
		})
	}

	onAddClick() {
		const code = this.state.code
		const brief_desc = this.state.brief_desc
		const verbose_desc = this.state.verbose_desc
		
		if(!code || !brief_desc) {
			alert('错误码/错误描述 不能为空');
			return;
		}

		if(!/^\d+$/.test(code)) {
			alert('错误码必须是整数');
			return;
		}

		this.props.addErrorCode({
			code: this.state.code, 
			brief_desc: this.state.brief_desc,
			verbose_desc: this.state.verbose_desc
		})
	}

	handleAlertDismiss() {
		this.setState({
			showErrMsg: false,
			errMsg: ''
		})
	}

	renderMsg() {
		let props = this.props
		let alertStyle = props.status === 'success' ? 'success' : 'danger'

		if(!this.state.showErrMsg)
			return null;

		return (
			<Alert bsStyle={alertStyle} onDismiss={this.handleAlertDismiss}>{this.state.errMsg}</Alert>
		)
	}

	render() {
		let props = this.props
		let btnDisabled = props.status === 'pending'
		let btnText = props.status === 'pending' ? '添加中...' : '新增'

		return (
			<div className="add-wrapper">
				<Panel header="新增错误码">
					{this.renderMsg()}
					<Form className="add-form">					
					    <FormGroup controlId="formInlineName">
					    	<FormControl
					    		type="text"
					    		placeholder="错误码"				    		
					    		value={this.state.code}
								onChange={this.handleInputChange.bind(this, 'code')}
					    	/>					    	
					    </FormGroup>					    	
					    <FormGroup>
						    <FormControl
					    		type="text"
					    		placeholder="错误描述"				    		
					    		value={this.state.brief_desc}
								onChange={this.handleInputChange.bind(this, 'brief_desc')}
					    	/>
					    </FormGroup>
					    <FormGroup>
					    	<FormControl 
					    		componentClass="textarea" 
					    		placeholder="详细描述（可选）" 
					    		value={this.state.verbose_desc}
					    		onChange={this.handleInputChange.bind(this, 'verbose_desc')}
					    	/>
					    </FormGroup>
					    <Button
					    	className=""
					    	bsStyle="primary"
					    	className="search-btn"
					    	disabled={btnDisabled}
					    	onClick={this.onAddClick}>{btnText}</Button>					    
					</Form>	
				</Panel>			
			</div>					
		)
	}
}

export default AddErrorCode;