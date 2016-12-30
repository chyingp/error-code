import { connect } from 'react-redux'
import { addCategory, getCategories, removeCategory, startEditCategory, stopEditCategory } from '../actions'
import Category from '../components/Category/App'

const mapStateToProps = (state) => ({
	...state
})

const mapDispatchToProps =  ({
	addCategory: addCategory,
	getCategories: getCategories,
	removeCategory: removeCategory,
	startEditCategory: startEditCategory,
	stopEditCategory: stopEditCategory
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Category)