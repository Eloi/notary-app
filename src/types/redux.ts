import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

export type DispatchThunkAny = ThunkDispatch<Promise<any>, void, Action<string>>

export interface Web3State {
    address: AddressState,
    contractAddress: AddressState,
}

export interface ContractState {
    asset: AssetState|null,
    assetError: string,
    isLoading: boolean,
}

export type AddressState = string|null

export interface AssetState {
    hash: string,
    owner: string,
    timestamp: number,
}