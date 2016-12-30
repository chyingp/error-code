import React from 'react'
import Add from './Add'
import List from './List'
import Search from './Search'
import Edit from './Edit'
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
			errMsg: '',
			showEdit: false  // 是否展示分类编辑窗口
		}

		this.onAddClick = this.onAddClick.bind(this)		
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
		this.handleConfirmEdit = this.handleConfirmEdit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		// let props = this.props
		// let nextStatus = nextProps.status
		// let msg = ''
		
		// if( nextStatus !== props.status && ['success', 'error'].indexOf(nextStatus)!== -1 ) {
		// 	switch(nextStatus){
		// 		case 'success':
		// 			msg = '错误添加成功'
		// 			break;
		// 		case 'error':
		// 			msg = '错误码添加失败'
		// 			break;
		// 		default:
		// 			// doing nothing
		// 			break;	 	
		// 	}

		// 	this.setState({
		// 		showErrMsg: true,
		// 		errMsg: msg
		// 	})
		// }
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

	handleEdit(item) {
		// this.setState({
		// 	showEdit: true
		// })

		this.props.startEditCategory(item)
	}

	handleCancelEdit() {
		// this.setState({
		// 	showEdit: false
		// })

		this.props.stopEditCategory()
	}

	handleConfirmEdit(item) {

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
		let editingCategory = props.editingCategory

		return (
			<div className="category-wrapper"> 				
				<div>
					<Add className="pull-right" addCategory={props.addCategory} category={props.category} />	
					<Search className="pull-left" getCategories={props.getCategories} />
				</div>				
				<List 
					items={props.categories.items} 
					getCategories={props.getCategories} 
					removeCategory={props.removeCategory} 
					editCategory={this.handleEdit}
					/>							
				<Edit 
					{...editingCategory}					
					onCancel={this.handleCancelEdit.bind(this)} 
					onConfirm={this.handleConfirmEdit}
					/>
			</div>					
		)
	}
}

export default AddErrorCode;