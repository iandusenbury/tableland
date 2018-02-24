import { map, identity } from 'ramda'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { RSAA, ApiError, getJSON } from 'redux-api-middleware'
import Cookies from 'cookies-js'

// identity used as a default function see http://ramdajs.com/docs/#identity
const defaultCallback = { onSuccess: identity }

export default function callApi(callDescriptor, callbacks = {}) {
  const authEmail = Cookies.get('X-User-Email')
  const authToken = Cookies.get('X-User-Token')
  const mergedCallbacks = { ...defaultCallback, callbacks }
  const {
    endpoint,
    method,
    types: [request, recieve, failure]
  } = callDescriptor

  return dispatch =>
    dispatch({
      [RSAA]: {
        body: JSON.stringify(decamelizeKeys), // TODO test on POST request
        endpoint: `http://api.roadmaps.lvh.me:5000/v1${endpoint}`,
        method: method || 'GET',
        types: [
          request,
          {
            type: recieve,
            payload: (action, state, res) =>
              getJSON(res)
                .then(camelizeKeys)
                .then(booleanizeValues)
          },
          {
            type: failure,
            payload: (action, state, res) =>
              getJSON(res).then(
                json =>
                  new ApiError(res.status, res.statusText, camelizeKeys(json))
              )
          }
        ],
        headers: {
          'X-User-Email': authEmail,
          'X-User-Token': authToken,
          'Content-Type': 'application/json'
        }
      }
    }).then(
      response =>
        response && handleResponse(response, mergedCallbacks, dispatch)
    )
}

function handleResponse(response, callbacks, dispatch) {
  return response.error
    ? response
    : handleSuccess(response, callbacks, dispatch)
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
