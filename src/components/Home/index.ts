import { connect } from 'react-redux'
import * as reducer from '../../redux/reducers'
import Home from './Home'

const mapStateToProps = (state: reducer.State) => ({
    address: state.web3.address,
})

export default connect(mapStateToProps)(Home)