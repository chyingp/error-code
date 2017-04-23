import { connect } from 'react-redux'
import { queryErrorCode } from '../actions'
import { removeErrorCode } from '../actions/code'
import Search from '../components/ErrorCodeList'

const mapStateToProps = (state) => ({
	items: state.items
})

const mapDispatchToProps =  ({
	queryErrorCode: queryErrorCode,
	removeErrorCode: removeErrorCode
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Search)