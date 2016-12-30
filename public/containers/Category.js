import { connect } from 'react-redux'
import { addCategory, getCategories, removeCategory, startEditCategory, stopEditCategory, modCategory } from '../actions'
import * as actions from '../actions/category'
import Category from '../components/Category/App'

const mapStateToProps = (state) => ({
	...state
})

const mapDispatchToProps =  (actions)

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Category)