import ActionTypes from '../constants/actionTypes'
import { map, contains } from 'ramda'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { CALL_API, ApiError, getJSON } from 'redux-api-middleware'

export function callApi(url, callbacks = {}) {
  return dispatch =>
    dispatch({
      [CALL_API]: {
        body: JSON.stringify(decamelizeKeys),
        endpoint: `/api/v1/${url}`,
        method: 'GET',
        types: [
          ActionTypes.REQUEST_EXAMPLE,
          {
            type: ActionTypes.RECIEVE_EXAMPLE,
            payload: (action, state, res) =>
              getJSON(res).then(camelizeKeys).then(booleanizeValues)
          },
          {
            type: ActionTypes.FAILURE_EXAMPLE,
            payload: (action, state, res) => getJSON(res).then(json =>
              new ApiError(res.status, res.statusText, camelizeKeys(json))
            )
          }
        ]
      }
    }).then(response => {
      return response && handleResponse(response, callbacks, dispatch)
    })
}

function handleResponse(response, callbacks, dispatch) {
  return response.error ? response : handleSuccess(response, callbacks, dispatch)
}

function handleSuccess(response, { onSuccess }, dispatch) {
  return onSuccess(response, dispatch)
}

// function tranformSuccessPayload(getJson) {
//   return type => (
//     {
//       ...objectize(type),
//       payload: (action, state, res) =>
//         getJson(res).then(camelizeKeys).then(booleanizeValues)
//     }
//   )
// }
//
// function transformFailurePayload(getJson) {
//   return type => (
//     {
//       ...objectize(type),
//       payload: (action, state, res) => getJson(res).then(json =>
//         new ApiError(res.status, res.statusText, camelizeKeys(json))
//       )
//     }
//   )
// }

function objectize(type) {
  return contains(typeof type, ['string', 'symbol'])
    ? { type }
    : type
}

/* eslint complexity: [1, 3] */
function booleanizeValues(payload) {
  const convertStringToBoolean = value => {
    switch (value) {
      case 'true':
        return true
      case 'false':
        return false
      default:
        return value
    }
  }
  const makeBoolean = value => {
    if (typeof value === 'object' && value !== null) {
      return map(makeBoolean, value)
    }
    return convertStringToBoolean(value)
  }

  return map(makeBoolean, payload)
}
