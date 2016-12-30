import React from 'react'
import { Button, ButtonToolbar, Grid, Row, Col, Table } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import moment from 'moment'

class AddErrorCode extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			code: ''
		}
		this.onInputChange = this.onInputChange.bind(this)
		this.onSearchClick = this.onSearchClick.bind(this)
		this.onRemoveCategory = this.onRemoveCategory.bind(this)
	}

	componentDidMount() {
		this.props.getCategories()
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

	onRemoveCategory(item) {
		this.props.removeCategory(item)
	}

	onEditCategory(item) {
		this.props.editCategory(item)
	}

	renderDateTime(created_at) {
		return created_at ? moment(created_at).format('YYYY年MM月DD日 HH时mm分ss秒') : '-'
	}

	render() {

		const props = this.props;

		return (
			<div className="show-grid">				
				<Table striped bordered condensed hover> 
					<thead>
						<tr>
							<th>分类名称</th>
							<th>分类描述</th>
							<th>创建时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{props.items.map((item) =>
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.desc || '暂无'}</td>
								<td>{this.renderDateTime(item.created_at)}</td>
								<td>
									<ButtonToolbar>
										<Button bsSize="sm" onClick={this.onEditCategory.bind(this, item)}>编辑</Button>									
										<Button bsSize="sm" onClick={this.onRemoveCategory.bind(this, item)}>删除</Button>
									</ButtonToolbar>									
								</td>
							</tr>
						)}	
					</tbody>
				</Table>						
			</div>
		)
	}
}

export default AddErrorCode;