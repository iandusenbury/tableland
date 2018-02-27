import ActionTypes from '../../constants/actionTypes'
import createReducer from '../../utils/createReducer'

const initialState = {
  open: false,
  message: 'initial message'
}

const handlers = {
  [ActionTypes.CLOSE_DIALOG]: closeDialog,
  [ActionTypes.OPEN_DIALOG]: openDialog
}

export default createReducer(initialState, handlers)

function closeDialog(state) {
  return {
    ...state,
    open: false
  }
}

function openDialog(state, { payload }) {
  const { message } = payload

  return {
    ...state,
    message,
    open: true
  }
}
