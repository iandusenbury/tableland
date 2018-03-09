import ActionTypes from '../../constants/actionTypes'
import createReducer from '../../utils/createReducer'

const initialState = {
  open: false,
  dialogData: {
    message: 'initial message',
    organizationId: null
  }
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
  const { id, data } = payload

  return {
    ...state,
    open: id,
    dialogData: {
      ...data
    }
  }
}
