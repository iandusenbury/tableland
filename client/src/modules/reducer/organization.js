import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  id: 0,
  type: '',
  name: '',
  description: '',
  url: '',
  category: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  link: '',
  users: []
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_ORGANIZATION]: requestOrganization
}

export default createReducer(initialState, handlers)

function requestOrganization(state, data) {
  const { payload: { organization } } = data
  
  return {
    ...state,
    ...organization
  }
}
