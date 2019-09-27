import Assets from './Assets'
import { connect } from 'react-redux'
import * as reducer from '../../redux/reducers'
import { contractClear, fetchAsset } from '../../redux/actions/contract'

import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'


const mapStateToProps = (state: reducer.State) => ({
    asset: state.contract.asset,
    assetError: state.contract.assetError,
    isLoading: state.contract.isLoading
})

const mapDispatchToProps = (dispatch: ThunkDispatch<Promise<any>, void, Action>) => ({
    contractClear: () => { dispatch(contractClear()) },
    fetchAsset: (txHash: string) => { dispatch(fetchAsset(txHash)) }

})

export default connect(mapStateToProps, mapDispatchToProps)(Assets)
