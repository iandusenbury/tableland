import { combineReducers } from 'redux'

import example from './example'
import user from './user'
import organizationPage from './organization'
import professionalPage from './professional'
import dialog from './dialog'
import isLoading from './isLoading'
import admin from './admin'
import search from './search'
import program from './program'
import roadmap from './roadmap'

export default combineReducers({
  example,
  user,
  organizationPage,
  professionalPage,
  dialog,
  isLoading,
  admin,
  search,
  program,
  roadmap
})
