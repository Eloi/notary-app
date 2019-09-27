import { connect } from 'react-redux'
import * as reducer from '../../redux/reducers'
import Home from './Home'
import { setContractAddress } from '../../redux/actions/web3'


import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

const mapDispatchToProps = (dispatch: ThunkDispatch<Promise<any>, void, Action>) => ({
    setContractAddress: (contractAddress: string) => { dispatch(setContractAddress(contractAddress)) }
})

const mapStateToProps = (state: reducer.State) => ({
    address: state.web3.address,
    contractAddress: state.web3.contractAddress
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)