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
	Alert,
	DropdownButton,
	MenuItem,
	Collapse,
	Well
} from 'react-bootstrap'

class AddErrorCode extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			code: '',
			brief_desc: '',
			verbose_desc: '',
			category_id: '',
			showErrMsg: false,
			errMsg: ''
		}

		this.onAddClick = this.onAddClick.bind(this)		
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
		this.handleCategoryChange = this.handleCategoryChange.bind(this)
	}

	componentDidMount () {
		
		this.props.getCategories()

		if(this.props.id) {
			this.props.queryErrorCode({
				_id: this.props.id
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		let props = this.props
		let nextStatus = nextProps.status
		let msg = ''
		
		if( nextStatus !== props.status && ['success', 'error'].indexOf(nextStatus)!== -1 ) {
			switch(nextStatus){
				case 'success':
					msg = '错误码添加成功'
					break;
				case 'error':
					msg = `${nextProps.ret_msg}（${nextProps.ret_code}）`;
					break;
				default:
					// doing nothing
					break;	 	
			}

			this.setState({
				showErrMsg: true,
				errMsg: msg
			})

			// this.tickAndHideMsg()
		}

		// 拉取分类（添加错误码的时候，需要选择分类）
		if( nextProps.categories.status==='success' && props.categories.status!=='success' ) {
			if( nextProps.categories.items.length ){
				this.setState({
					category_id: nextProps.categories.items[0]._id
				})
			}
		}
	}

	tickAndHideMsg () {
		var that = this;
		
		setTimeout(() => {
			if( that.props.status === 'success' && that.state.showErrMsg ) {
				that.setState( { showErrMsg: false } )
			}
		}, 3000)
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
		const category_id = this.state.category_id
		
		if(!code || !brief_desc) {
			alert('错误码/错误描述 不能为空');
			return;
		}

		if(!/^\d+$/.test(code)) {
			alert('错误码必须是整数');
			return;
		}

		if(!category_id){
			alert('请选择分类');
			return;
		}

		this.props.addErrorCode({
			code: this.state.code, 
			brief_desc: this.state.brief_desc,
			verbose_desc: this.state.verbose_desc,
			category_id: this.state.category_id
		})
	}

	handleAlertDismiss() {
		this.setState({
			showErrMsg: false,
			errMsg: ''
		})
	}

	handleCategoryChange(category_id) {
		this.setState({
			category_id: category_id	
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

	renderCategories() {
		let props = this.props
		let status = props.categories.status
		let title = '分类拉取中...'
		let item
		let category_id = this.state.category_id

		if(status === 'pending'){
			return <div>{title}</div>
		}
		else if(status === 'success'){
			
			if(category_id) {
				item = props.categories.items.find((item) => item._id === category_id)
				title = item && item.name
			}

			return (
				<DropdownButton bsStyle="default" title={title} id="cate-list">				
					{props.categories.items.map((item) => 
						<MenuItem eventKey={item._id} key={item._id} onSelect={this.handleCategoryChange} active={item._id===category_id}>{item.name}</MenuItem>
					)}
				</DropdownButton>	
			)			
		}
	}

	render() {
		let props = this.props
		let btnDisabled = props.status === 'pending'
		let btnText = props.status === 'pending' ? '提交中...' : '提交'

		console.log(props.id);

		return (
			<div className="add-wrapper">
				{this.renderMsg()}
				<Panel header="新增错误码">					
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
					    	{this.renderCategories()}
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