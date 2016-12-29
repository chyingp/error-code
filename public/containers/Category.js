import { connect } from 'react-redux'
import { addCategory } from '../actions'
import Category from '../components/Category/App'

const mapStateToProps = (state) => ({
	...state
})

const mapDispatchToProps =  ({
	addCategory: addCategory
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Category)