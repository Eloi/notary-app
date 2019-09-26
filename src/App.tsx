import React from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import Home from './components/Home'
import AssetRegister from './components/AssetRegister'
import Assets from './components/Assets'
import AssetsRecent from './components/AssetsRecent'

import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
       <Route path="/register" component={AssetRegister} />
       <Route path="/assets" component={Assets} />
       <Route path="/recent" component={AssetsRecent} />
        <Route component={Home} />
      </Switch>
    </div>
  )
}

export default connect()(App)
