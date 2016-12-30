import { connect } from 'react-redux'
import { addErrorCode } from '../actions'
import Add from '../components/AddErrorCode'
import { getCategories } from '../actions/category'

const mapStateToProps = (state) => ({
	...state.code,
	categories: state.categories
})

const mapDispatchToProps =  ({
	addErrorCode: addErrorCode,
	getCategories: getCategories
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Add)