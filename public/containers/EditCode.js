import { connect } from 'react-redux'
import { addErrorCode } from '../actions'
import EditErrorCode from '../components/EditErrorCode'
import { getCategories } from '../actions/category'
import { modErrorCode, queryErrorCodeDetail } from '../actions/code'

const mapStateToProps = (state, ownProps) => ({
	...state.modCode,
	categories: state.categories,
    id: ownProps.params.id
})

const mapDispatchToProps =  ({
    modErrorCode: modErrorCode,
    queryErrorCodeDetail: queryErrorCodeDetail,
	getCategories: getCategories
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(EditErrorCode)