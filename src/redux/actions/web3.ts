import { DispatchThunkAny, AddressState } from '../../types/redux'

export const WEB3_SET_ADDRESS = 'WEB3_SET_ADDRESS'
export const WEB3_SET_ADDRESS_DONE = 'WEB3_SET_ADDRESS_DONE'
export const WEB3_SET_ADDRESS_FAILED = 'WEB3_SET_ADDRESS_FAILED'

export const WEB3_SET_CONTRACT_ADDRESS = 'WEB3_SET_CONTRACT_ADDRESS'
export const WEB3_SET_CONTRACT_ADDRESS_DONE = 'WEB3_SET_CONTRACT_ADDRESS_DONE'
export const WEB3_SET_CONTRACT_ADDRESS_FAILED = 'WEB3_SET_CONTRACT_ADDRESS_FAILED'

export function setAddress(address : AddressState) {
    return (dispatch: DispatchThunkAny, getState: any) => {
        dispatch({ type: WEB3_SET_ADDRESS })
        if (address) {
            dispatch({ type: WEB3_SET_ADDRESS_DONE, payload: address })
        }
        else {
            dispatch({ type: WEB3_SET_ADDRESS_FAILED })
        }
    }
}

export function setContractAddress(contractAddress : AddressState) {
    return (dispatch: DispatchThunkAny, getState: any) => {
        dispatch({ type: WEB3_SET_CONTRACT_ADDRESS })
        if (contractAddress) {
            dispatch({ type: WEB3_SET_CONTRACT_ADDRESS_DONE, payload: contractAddress })
        }
        else {
            dispatch({ type: WEB3_SET_CONTRACT_ADDRESS_FAILED })
        }
    }
}