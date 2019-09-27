import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Home from './components/Home'
import AssetRegister from './components/AssetRegister'
import Assets from './components/Assets'
import AssetsSearch from './components/AssetsSearch'
import AssetsRecent from './components/AssetsRecent'
import { setAddress } from './redux/actions/web3'
import { configureWeb3 } from './lib/web3'
import { AddressState } from './types/redux'
import './App.css'

interface DispatchProps {
  setAddress: (address: AddressState) => void
}

interface Props extends DispatchProps {
}

const App: React.FC<Props> = (props) => {

  useEffect(() => {
    const [web3, address] = configureWeb3()
    if(web3 && address)
      props.setAddress(address)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Switch>
       <Route path="/register" component={AssetRegister} />
       <Route path="/assets" component={Assets} />
       <Route path="/search" component={AssetsSearch} />
       <Route path="/recent" component={AssetsRecent} />
        <Route component={Home} />
      </Switch>
    </div>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Promise<any>, void, Action>) => ({
  setAddress: (address: AddressState) => { dispatch(setAddress(address)) }
})

export default connect(undefined, mapDispatchToProps)(App)
