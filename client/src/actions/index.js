import ActionTypes from '../constants/actionTypes'
import { callApi } from '../utils/api'
// action creators

export function fetchExample(url) {
  return dispatch => {
    return dispatch(callApi(url, { onSuccess: fetchExampleSuccess }))
  }
}

function fetchExampleSuccess(response, dispatch) {
  const { payload: { message } } = response

  return {
    type: ActionTypes.MESSAGE_SUCCESS,
    message
  }
}
