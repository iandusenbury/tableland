import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'

// action creators
/* eslint-disable import/prefer-default-export */
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
    dispatch(
      callApi(callDescriptor /* , { onSuccess: oprtionalSuccessCallback } */)
    )
  }
}

export function adminChangeTableTo(index) {
  return {
    type: ActionTypes.ADMIN_CHANGE_TABLE,
    payload: {
      index
    }
  }
}

export function adminChangeAdminTo(changeTo) {
  return {
    type: ActionTypes.ADMIN_CHANGE_ADMIN,
    payload: {
      changeTo
    }
  }
}
