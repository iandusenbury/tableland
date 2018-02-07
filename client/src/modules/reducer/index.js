import { combineReducers } from 'redux'

import example from './example'
import adminPage from './adminReducer/adminReducer'

export default combineReducers({
  example,
  adminPage,
})
