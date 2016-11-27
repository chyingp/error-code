import { connect } from 'react-redux'
import { queryErrorCode } from '../actions'
import Search from '../components/ErrorCodeList'

const mapStateToProps = (state) => ({
	items: state.items
})

const mapDispatchToProps =  ({
	queryErrorCode: queryErrorCode
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Search)