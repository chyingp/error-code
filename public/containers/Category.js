import { connect } from 'react-redux'
import { addCategory, getCategories } from '../actions'
import Category from '../components/Category/App'

const mapStateToProps = (state) => ({
	...state
})

const mapDispatchToProps =  ({
	addCategory: addCategory,
	getCategories: getCategories
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Category)