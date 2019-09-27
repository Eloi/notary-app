import Web3 from 'web3'
import { AddressState } from '../../types/redux'

declare global {
    interface Window { ethereum: any; contractDebug: any }
}

window.ethereum = window.ethereum || null;

export const web3Available = () : boolean => (window.ethereum !== null)

export const configureWeb3 = () : [any, AddressState] => {
    window.ethereum.enable()
    const web3 = new Web3(window.ethereum)
    return [web3, window.ethereum.selectedAddress]
}
