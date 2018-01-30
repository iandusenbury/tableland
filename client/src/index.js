import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './base/store'
import App from './containers/app'
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import MUIThemeProvider from 'material-ui/styles/MuiThemeProvider'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MUIThemeProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
        </MUIThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
