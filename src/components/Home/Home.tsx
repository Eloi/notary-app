import React from 'react'
import { AddressState} from '../../types/redux'

import Layout from '../Layout'

interface StateProps {
    address : AddressState,
}

interface Props extends StateProps {}


const Home: React.FC<Props> = (props) => {
    return (
        <Layout selected="welcome">
            <div>
                HOME. Configured address: 
                {props.address || "NO ADDRESS FOUND, PLEASE CONFIGURE METAMASK AND RELOAD"}
            </div>
        </Layout>
    )
}

export default Home