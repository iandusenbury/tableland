import { combineReducers } from 'redux'

import example from './example'
import user from './user'
import adminPage from './adminReducer/adminReducer'
import dialog from './dialog'
import professionalPage from './professional'
import roadmap from './roadmap'

export default combineReducers({
  example,
  user,
  adminPage,
  professionalPage,
  dialog,
  roadmap
})
