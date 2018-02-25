import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
  user: {
    id: 0,
    type: 'User',
    firstName: '',
    lastName: '',
    description: '',
    contactUrl: '',
    mainTitle: 'lol',
    mainLocation: '',
    role: '',
    link: '',
    media: [],
    experiences: []
  }
}

const handlers = {
  // Pattern:
  // [ActionTypes.ACTION_NAME]: actionFunction
  [ActionTypes.RECIEVE_PROFESSIONAL]: requestProfessional
}

export default createReducer(initialState, handlers)

function requestProfessional(state, data) {
  const { payload: { user } } = data
	const { firstName, mainLocation, mainTitle } = user 

  return {
    ...state,
    user: {
      ...user,
      firstName,
      mainLocation,
      mainTitle
    }
  }
}
