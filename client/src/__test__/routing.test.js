import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from 'material-ui/styles/getMuiTheme'

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConnectedApp from '../components/app'
import ConnectedAdminPage from '../containers/admin'
import ConnectedHome from '../components/home'
import ConnectedAbout from '../components/about'
import ConnectedSearchResults from '../components/searchResults'

import store, { history } from '../base/store'

Enzyme.configure({ adapter: new Adapter() })

// Expected Results //

const expectedRoutes = [
  { path: '/', component: ConnectedHome },
  { path: '/about-us', component: ConnectedAbout },
  { path: '/admin', component: ConnectedAdminPage },
  { path: '/results', component: ConnectedSearchResults }
]

//  Test Suite  //

describe('routing to correct components', () => {
  let wrapper

  const mountComponent = MyComponent => {
    wrapper = mount(
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
  }

  it('renders correct routes', () => {
    mountComponent(ConnectedApp)

    /* eslint no-param-reassign: ["error", { "props": false }] */
    const pathMap = wrapper.find(Route).reduce((map, route) => {
      const routeProps = route.props()
      map[routeProps.path] = routeProps.component // Linter exception for this line
      return map
    }, {})

    expectedRoutes.forEach(expectedRoute => {
      expect(pathMap[expectedRoute.path]).toBe(expectedRoute.component)
    })
  })
})
