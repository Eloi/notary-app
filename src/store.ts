import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import * as persistence from './lib/persistence'

export const history = createBrowserHistory()

export default function configureStore(preloadedState?: any) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      ),
    ),
  )

  store.subscribe(() => {
    persistence.saveState(store.getState())
  })

  return store
}
