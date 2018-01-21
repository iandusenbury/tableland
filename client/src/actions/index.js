import ActionTypes from '../constants/actionTypes'
import { callApi } from '../utils/api'

// action creators
export function fetchExample(url) {
  return dispatch => {
    return dispatch(callApi(
      url,
      /* { onSuccess: optionalCallbackFunction } */
    ))
  }
}
