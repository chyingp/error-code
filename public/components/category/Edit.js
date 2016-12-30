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
	Modal
} from 'react-bootstrap'
import classnames from 'classnames'

class Edit extends React.Component {
	constructor(props) {
		super(props)

		// let props = this.props

		this.state = {
			name: props.name,
			desc: props.desc
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		let props = this.props
	
		if(nextProps.item._id !== props.item._id){
			this.setState({
				name: nextProps.item.name || '',
				desc: nextProps.item.desc || ''
			})
		}
	}

	handleInputChange(key, evt) {
		this.setState({
			[key]: evt.target.value
		})
	}

	handleConfirm() {
		let name = this.state.name.trim()

		if(!name){
			return
		}

		this.props.onConfirm({
			name: name,
			desc: this.state.desc
		})
	}

	renderMsg() {
		return null
	}

	render() {

		let props = this.props
		let btnDisabled = props.status === 'pending'
		let btnText = props.status === 'pending' ? '修改中...' : '修改'
		let className = classnames('category-edit-wrapper', props.className)

		return (			
				<Modal show={props.show} bsSize="sm">
					<Modal.Header>
		        		<Modal.Title>分类编辑</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className={className}>				
							<Form >
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
							    {this.renderMsg()}
							</Form>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
					    	bsStyle="primary"
					    	disabled={btnDisabled}
					    	onClick={this.handleConfirm}>{btnText}</Button>
					    <Button
					    	bsStyle="default"
					    	disabled={btnDisabled}
					    	onClick={props.onCancel}>取消</Button>
					</Modal.Footer>
				</Modal>				
			
		)
	}
}

export default Edit