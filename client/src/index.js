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

// import material-ui theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'material-ui/styles/getMuiTheme'


const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
