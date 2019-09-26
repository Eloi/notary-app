import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import * as serviceWorker from './serviceWorker'
import configureStore, { history } from './store'
import * as persistence from './lib/persistence'

const store = configureStore(persistence.loadState())

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

serviceWorker.unregister()
