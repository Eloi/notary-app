import { AnyAction } from 'redux'
import {
    WEB3_SET_ADDRESS, WEB3_SET_ADDRESS_DONE, WEB3_SET_ADDRESS_FAILED,
    WEB3_SET_CONTRACT_ADDRESS, WEB3_SET_CONTRACT_ADDRESS_DONE,
    WEB3_SET_CONTRACT_ADDRESS_FAILED
} from '../actions/web3'

import { Web3State } from '../../types/redux'

const initialState: Web3State = {
    address: null,
    contractAddress: null
}

export function web3Reducer(state: Web3State = initialState, action: AnyAction): Web3State {
    switch (action.type) {
        case WEB3_SET_ADDRESS:
            console.log("WEB3_SET_ADDRESS")
            return {
                ...state,
                address: null
            }
        case WEB3_SET_ADDRESS_DONE:
            console.log("WEB3_SET_ADDRESS_DONE", action, action.payload)
            return {
                ...state,
                address: action.payload
            }
        case WEB3_SET_ADDRESS_FAILED:
            console.log("WEB3_SET_ADDRESS_FAILED", action.payload)
            return {
                ...state,
                address: null
            }
        case WEB3_SET_CONTRACT_ADDRESS:
            console.log("WEB3_SET_CONTRACT_ADDRESS")
            return {
                ...state,
                contractAddress: null
            }
        case WEB3_SET_CONTRACT_ADDRESS_DONE:
            console.log("WEB3_SET_CONTRACT_ADDRESS_DONE", action, action.payload)
            return {
                ...state,
                contractAddress: action.payload
            }
        case WEB3_SET_CONTRACT_ADDRESS_FAILED:
            console.log("WEB3_SET_CONTRACT_ADDRESS_FAILED", action.payload)
            return {
                ...state,
                contractAddress: null
            }
        default:
            return state
    }
}
