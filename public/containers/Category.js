import { connect } from 'react-redux'
import { addCategory, getCategories, removeCategory } from '../actions'
import Category from '../components/Category/App'

const mapStateToProps = (state) => ({
	...state
})

const mapDispatchToProps =  ({
	addCategory: addCategory,
	getCategories: getCategories,
	removeCategory: removeCategory
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Category)