import { connect } from 'react-redux'
import { addErrorCode } from '../actions'
import Add from '../components/AddErrorCode'

const mapStateToProps = (state) => ({
	...state.code
})

const mapDispatchToProps =  ({
	addErrorCode: addErrorCode
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Add)