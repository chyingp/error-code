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
import classnames from 'classnames'

class AddErrorCode extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			name: '',
			desc: '',			
			showErrMsg: false,
			errMsg: ''
		}

		this.onAddClick = this.onAddClick.bind(this)		
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		let props = this.props
		let nextStatus = nextProps.category.status
		let msg = ''
		
		if( nextStatus !== props.category.status && ['success', 'error'].indexOf(nextStatus)!== -1 ) {
			switch(nextStatus){
				case 'success':
					msg = '分类添加成功'
					break;
				case 'error':
					msg = '分类添加失败'
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
		const name = this.state.name
		const desc = this.state.desc
		
		if(!name || !desc) {
			alert('分类名称或分类描述不能为空');
			return;
		}

		// if(!/^\d+$/.test(code)) {
		// 	alert('错误码必须是整数');
		// 	return;
		// }

		this.props.addCategory({
			name: this.state.name, 
			desc: this.state.desc
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
		// let alertStyle = props.status === 'success' ? 'success' : 'danger'
		let className = classnames('err-msg', props.category.status === 'success' ? 'text-success' : 'text-danger')

		if(!this.state.showErrMsg)
			return null;

		return (
			<div className={className} onDismiss={this.handleAlertDismiss}>{this.state.errMsg}</div>
		)
	}

	render() {
		let props = this.props
		let btnDisabled = props.status === 'pending'
		let btnText = props.status === 'pending' ? '添加中...' : '新增'

		return (
			<div className="show-grid category-add-wrapper">
				<Form className="category-add-form" inline>					
				    <FormGroup controlId="formInlineName">
				    	<FormControl
				    		type="text"
				    		placeholder="分类名"				    		
				    		value={this.state.name}
							onChange={this.handleInputChange.bind(this, 'name')}
				    	/>					    	
				    </FormGroup>					    	
				    <FormGroup>
					    <FormControl
				    		type="text"
				    		placeholder="分类描述"				    		
				    		value={this.state.desc}
							onChange={this.handleInputChange.bind(this, 'desc')}
				    	/>
				    </FormGroup>				    
				    <Button
				    	className=""
				    	bsStyle="primary"
				    	className="search-btn"
				    	disabled={btnDisabled}
				    	onClick={this.onAddClick}>{btnText}</Button>
				    {this.renderMsg()}					    
				</Form>		
			</div>				
		)
	}
}

export default AddErrorCode;