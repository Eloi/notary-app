import NotaryABI from './NotaryABI.json'
import { configureWeb3 } from '.'


export const buildNotaryContract = (contractAddress: string): any => {
    const [web3, fromAddress] = configureWeb3()
    const contract = new web3.eth.Contract(NotaryABI, contractAddress, { from: fromAddress })
    return contract
}
