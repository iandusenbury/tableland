import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducer'

export const history = createHistory()

const enhancers = []
const middleware = [apiMiddleware, thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), ...enhancers)
)

export default store
