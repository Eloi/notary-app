import { AnyAction } from 'redux'
import { CONTRACT_CLEAR, CONTRACT_FETCH_ASSET, CONTRACT_FETCH_ASSET_DONE, CONTRACT_FETCH_ASSET_FAILED } from '../actions/contract'
import { ContractState } from '../../types/redux'

const initialState: ContractState = {
    asset: null,
    assetError: '',
    isLoading: false,
}

export function contractReducer(state: ContractState = initialState, action: AnyAction): ContractState {
    switch (action.type) {
        case CONTRACT_CLEAR:
            return initialState
            
        case CONTRACT_FETCH_ASSET:
            console.log("CONTRACT_FETCH_ASSET")
            return {
                ...state,
                isLoading: true,
                assetError: '',
                asset: null
            }
        case CONTRACT_FETCH_ASSET_DONE:
            console.log("CONTRACT_FETCH_ASSET_DONE", action.payload)
            return {
                ...state,
                isLoading: false,
                assetError: '',
                asset: action.payload
            }
        case CONTRACT_FETCH_ASSET_FAILED:
            console.log("CONTRACT_FETCH_ASSET_FAILED", action.payload)
            return {
                ...state,
                isLoading: false,
                assetError: action.payload,
                asset: null
            }
        default:
            return state
    }
}
