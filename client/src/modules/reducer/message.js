import ActionTypes from '../../constants/actionTypes'
import createReducer from '../../utils/createReducer'

const initialState = {
  active: false,
  message: ''
}

const handlers = {
  [ActionTypes.ADD_MESSAGE]: addMessage,
  [ActionTypes.CLEAR_MESSAGE]: clearMessage
}

export default createReducer(initialState, handlers)

function clearMessage(state) {
  return {
    ...state,
    active: false,
    message: ''
  }
}

function addMessage(state, { payload }) {
  const { message } = payload
  return {
    ...state,
    active: true,
    message
  }
}
