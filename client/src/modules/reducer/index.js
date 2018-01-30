import { combineReducers } from 'redux'

import example from './example'
import adminPage from './adminReducer'

export default combineReducers({
  example,
  adminPage,
})
