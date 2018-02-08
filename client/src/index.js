import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { theme, MuiThemeProvider } from 'material-ui/styles'

import store, { history } from './base/store'
import App from './containers/app'

// import material-ui theme

const target = document.querySelector('#root')

const muiTheme = theme({
  palette: {
    backgroundColor:  '#ffc0cb',
    quantumOrange:    '#ff9e15',
    thermalRed:       '#ea4e46',
    atomicGreen:      '#bed62f',
    waveBlue:         '#8195b1',
    rawUmber:         '#715558',
    sand:             '#e7e0d7'
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
