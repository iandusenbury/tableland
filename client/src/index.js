import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './base/store'
import App from './containers/app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from './styles'


const target = document.querySelector('#root')


render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App />
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
