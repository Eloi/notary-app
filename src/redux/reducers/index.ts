import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { web3Reducer as web3 } from './web3Reducer'
import { contractReducer as contract } from './contractReducer'
import { Web3State, ContractState } from '../../types/redux'

const rootReducer = (history: History) => combineReducers({
    web3,
    contract,
    router: connectRouter(history)
})

export interface State {
    web3: Web3State,
    contract: ContractState
}

export default rootReducer