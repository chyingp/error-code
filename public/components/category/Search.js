import React from 'react'
import classnames from 'classnames'
import { 
	Form, FormGroup, FormControl, 
	Button 
} from 'react-bootstrap'


class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: ''
		}

		this.handleSearchClick = this.handleSearchClick.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleSearchClick() {
		let opt = {}
		if(this.state.name) opt.name = this.state.name
			
		this.props.getCategories(opt)
	}

	handleInputChange(evt) {
		this.setState({
			name: evt.target.value
		})
	}

	render() {
		let props = this.props
		let className = classnames('show-grid', 'category-search-wrapper', props.className)

		return (
			<div className={className}>
				<Form className="category-search-form" inline>					
				    <FormGroup controlId="formInlineName" className="mgr">
				    	<FormControl
				    		type="text"
				    		placeholder="分类名"				    		
				    		value={this.state.name}
							onChange={this.handleInputChange}
				    	/>					    	
				    </FormGroup>				    
				    <Button
				    	className=""
				    	bsStyle="primary"
				    	className="search-btn"
				    	onClick={this.handleSearchClick}>查询</Button>				    
				</Form>		
			</div>	
		)
	}
}

export default Search