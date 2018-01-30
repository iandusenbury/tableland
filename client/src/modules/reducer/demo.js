import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  user: {
    firstName: 'Test',
    lastName: 'Testerson',
    age: 25,
    salary: 500000
  }
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.UPDATE_FIRST_NAME]: updateName
}

export default createReducer(initialState, handlers)

function updateName(state, { payload }) {
  const { user } = state
  const { firstName } = payload

  return {
    ...state,
    user: {
      ...user,
      firstName
    }
  }
}
