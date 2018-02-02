import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './base/store'
import App from './containers/app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import  getMuiTheme  from 'material-ui/styles/getMuiTheme'
import {deepOrange500} from 'material-ui/styles/colors'
import {orange500} from 'material-ui/styles/colors'

const target = document.querySelector('#root')

const muiTheme = getMuiTheme({
   palette: {
       primary1Color: orange500,
       accent1Color: deepOrange500
   }
});


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
