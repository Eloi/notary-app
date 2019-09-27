import { DispatchThunkAny, AssetState } from '../../types/redux'
import { buildNotaryContract } from '../../lib/web3/contract'

export const CONTRACT_CLEAR = 'CONTRACT_CLEAR'

export const CONTRACT_FETCH_ASSET = 'CONTRACT_FETCH_ASSET'
export const CONTRACT_FETCH_ASSET_DONE = 'CONTRACT_FETCH_ASSET_DONE'
export const CONTRACT_FETCH_ASSET_FAILED = 'CONTRACT_FETCH_ASSET_FAILED'

export function contractClear() {
    return { type: CONTRACT_CLEAR }
}

function receiptToAsset(docHash: any, receipt: any) : AssetState {
    return {
        hash: docHash,
        owner: receipt[1],
        timestamp: receipt[0],
    }
}

export function fetchAsset(docHash : string) {
    return (dispatch: DispatchThunkAny, getState: any) => {
            dispatch({ type: CONTRACT_FETCH_ASSET })
        if (docHash) {
            const {web3: { contractAddress }} = getState()
            const contract = buildNotaryContract(contractAddress)
            window.contractDebug = contract
            if (contract) {
              contract.methods.getDocumentByHash(`0x${docHash}`)
                .call()
                .then((receipt : any) => {
                  console.log("CONTRACT_FETCH_ASSET receipt OK", receipt)
                  dispatch({ type: CONTRACT_FETCH_ASSET_DONE, payload: receiptToAsset(docHash, receipt)})
                })
                .catch((error : any, receipt?: any) => {
                  console.log("CONTRACT_FETCH_ASSET receipt ERROR", "Receipt?", receipt, "Error:", error)
                  dispatch({ type: CONTRACT_FETCH_ASSET_FAILED, payload: error.message })
                })
            }
        }
        else {
            dispatch({ type: CONTRACT_FETCH_ASSET_FAILED, payload: "Undefined docHash" })
        }
    }
}

