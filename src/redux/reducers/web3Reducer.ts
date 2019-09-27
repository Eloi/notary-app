import { AnyAction } from 'redux'
import { WEB3_SET_ADDRESS, WEB3_SET_ADDRESS_DONE, WEB3_SET_ADDRESS_FAILED } from '../actions/web3'
import { Web3State } from '../../types/redux'

const initialState: Web3State = {
    address: null,
    contractAddress: "0x0d4f9651b432F709CBB5076e35BAC24B7068B2a5"
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
            console.log("WEB3_SET_ADDRESS_DONE", action, action.payload, "XXX")
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
        default:
            return state
    }
}
