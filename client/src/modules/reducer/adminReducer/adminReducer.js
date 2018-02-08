import createReducer from '../../../utils/createReducer'
import ActionTypes from '../../../constants/actionTypes'
import { userTables } from './dummies'

const initialState = {
  tables: userTables,
  currentTable: userTables[0],
  isAdmin: true
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

  return {
    ...state,
    currentTable: tables[0],
    isAdmin: changeTo
  }
}
