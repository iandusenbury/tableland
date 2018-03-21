import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  loading: true
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.APP_INITIALIZED]: appReady
}

export default createReducer(initialState, handlers)

function appReady() {
  return {
    ...initialState,
    loading: false
  }
}
