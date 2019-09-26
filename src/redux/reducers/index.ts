import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
// import { assetsReducer as flags } from './assetsReducer'

// import { AssetState } from 'types/redux'

const rootReducer = (history: History) => combineReducers({
    // assetsReducer,
  router: connectRouter(history)
})

export interface State {
//   assets: assetsReducer,
}

export default rootReducer