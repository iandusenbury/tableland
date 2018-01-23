import { map, identity } from 'ramda'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { CALL_API, ApiError, getJSON } from 'redux-api-middleware'

// identity used as a default function see http://ramdajs.com/docs/#identity
const defaultCallback = { onSuccess: identity }

export function callApi(callDescriptor, callbacks = {}) {
  const mergedCallbacks = { ...defaultCallback, callbacks }
  const {
    endpoint,
    method,
    types: [request, recieve, failure]
  } = callDescriptor

  return dispatch =>
    dispatch({
      [CALL_API]: {
        body: JSON.stringify(decamelizeKeys), // TODO test on POST request
        endpoint,
        method: method || 'GET',
        types: [
          request,
          {
            type: recieve,
            payload: (action, state, res) =>
              getJSON(res).then(camelizeKeys).then(booleanizeValues)
          },
          {
            type: failure,
            payload: (action, state, res) => getJSON(res).then(json =>
              new ApiError(res.status, res.statusText, camelizeKeys(json))
            )
          }
        ]
      }
    }).then(response => {
      return response && handleResponse(response, mergedCallbacks, dispatch)
    })
}

function handleResponse(response, callbacks, dispatch) {
  return response.error ? response : handleSuccess(response, callbacks, dispatch)
}

// if a callback function is supplied it will use that function
// if not we just return response, dispatch (per the default identity callback)
function handleSuccess(response, { onSuccess }, dispatch) {
  return onSuccess(response, dispatch)
}

// convert strings to boolean values
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
