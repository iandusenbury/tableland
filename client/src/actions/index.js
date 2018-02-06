import ActionTypes from '../constants/actionTypes'
import { callApi } from '../utils/api'

// action creators
export function fetchExample() {
  const callDescriptor = {
    endpoint: `/api/v1/example`,
    types: [
      ActionTypes.REQUEST_EXAMPLE,
      ActionTypes.RECIEVE_EXAMPLE,
      ActionTypes.FAILURE_EXAMPLE
    ]
  }

  return dispatch => {
    return dispatch(callApi(
      callDescriptor,
      /* { onSuccess: optionalCallbackFunction } */
    ))
  }
}

export function fetchDummyUsersExample() {
  const callDescriptor = {
    endpoint: `/dummies`,
    types: [
      ActionTypes.REQUEST_EXAMPLE,
      ActionTypes.RECIEVE_EXAMPLE,
      ActionTypes.FAILURE_EXAMPLE
    ]
  }

  return dispatch => {
    return dispatch(callApi(
      callDescriptor,
      /* { onSuccess: optionalCallbackFunction } */
    ))
  }
}
