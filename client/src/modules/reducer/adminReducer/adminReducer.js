import createReducer from '../../../utils/createReducer'
import ActionTypes from '../../../constants/actionTypes'
import { userTables } from './dummies'

const initialAdminState = {
  index: 0,
  isAdmin: true
}
const initialNonAdminState = {
  index: 2,
  isAdmin: false
}

const initialState = {
  tables: userTables,
  currentTable: userTables[initialNonAdminState.index],
  isAdmin: initialNonAdminState.isAdmin
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.ADMIN_CHANGE_TABLE]: adminChangeTable,
  [ActionTypes.ADMIN_CHANGE_ADMIN]: adminChangeAdmin
}

export default createReducer(initialState, handlers)

function adminChangeTable(state, { payload }) {
  const { index } = payload
  const { tables } = state

  return {
    ...state,
    currentTable: tables[index]
  }
}

function adminChangeAdmin(state, { payload }) {
  const { changeTo } = payload
  const { tables } = state
  const index = changeTo ? initialAdminState.index : initialNonAdminState.index

  return {
    ...state,
    currentTable: tables[index],
    isAdmin: changeTo
  }
}
