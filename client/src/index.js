import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import store, { history } from './base/store'
import App from './containers/app'
import { initializeApp } from './actions'

const target = document.querySelector('#root')

document.addEventListener('DOMContentLoaded', () => {
  store.dispatch(initializeApp())
})

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MuiThemeProvider>
          <App />
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
