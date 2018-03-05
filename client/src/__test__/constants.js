import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../base/store'

export const mountComponent = MyComponent => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MuiThemeProvider theme={theme}>
          <MyComponent />
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>
)

export default {
  mountComponent
}
