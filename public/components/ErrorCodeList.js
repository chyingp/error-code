import React from 'react'
import { Button, Grid, Col } from 'react-bootstrap'

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
				<ul>
					{props.items.map((item) =>
						<li key={item.code}>{item.code}：{item.desc}</li>
					)}	
				</ul>					
			</Grid>
		)
	}
}

export default AddErrorCode;