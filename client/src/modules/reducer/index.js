import { combineReducers } from 'redux'

import example from './example'
import user from './user'
import adminPage from './adminReducer/adminReducer'
import organizationPage from './organization'
import professionalPage from './professional'
import dialog from './dialog'
import search from './search'
import roadmap from './roadmap'

export default combineReducers({
  example,
  user,
  organizationPage,
  professionalPage,
  adminPage,
  dialog,
  search,
  roadmap
})
