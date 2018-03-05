import { combineReducers } from 'redux'

import example from './example'
import user from './user'
import adminPage from './adminReducer/adminReducer'
import professionalPage from './professional'
import dialog from './dialog'
import isLoading from './isLoading'
import admin from './admin'

export default combineReducers({
  example,
  user,
  professionalPage,
  adminPage,
  dialog,
  isLoading,
  admin
})
