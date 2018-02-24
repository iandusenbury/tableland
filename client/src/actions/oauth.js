import { append, pathOr } from 'ramda'
import moment from 'moment'
import Cookies from 'cookies-js'

import ActionTypes from '../constants/actionTypes'
import { closeDialog, openOAuthDialog, addMessage } from '../actions'

export function authorizeOAuth(
  authorizeUrl,
  { integrationName, fetchUser, onFailure, onSuccess, showDialog = true }
) {
  return dispatch => {
    if (showDialog) {
      dispatch(openOAuthDialog(integrationName))
    }

    const url = authorizeUrl
    const authorizeWindow = window.open(
      url,
      'Authorize',
      'width=600 height=600'
    )

    if (!authorizeWindow) {
      return dispatch(
        authorizationFailed({
          message: 'Pop-up blocker enabled. Enable Pop-ups and try again.',
          onFailure
        })
      )
    }
    dispatch(oauthStart({ integrationName }))

    authorizeWindow.focus()
    const endBy = moment().add(moment.duration({ minutes: 5 }))
    const promise = new Promise((resolve, reject) => {
      const interval = setInterval(
        (authWindow, promiseResolve, promiseReject, intv) => {
          if (authCookiesSet()) {
            authorizeWindow.close()
            dispatch(fetchUser())
              .then(() => {
                clearInterval(interval)
                resolve()
                return dispatch(processAuthorization({ onSuccess, onFailure }))
              })
              .catch(err => {
                const message = err.message
                  ? err.message
                  : pathOr('Authorization Failure.', ['error', 'message'], err)

                dispatch(authorizationFailed({ message, onFailure }))
                clearInterval(this)
                reject()
              })
          } else if (moment().isAfter(endBy)) {
            clearInterval(intv)
            authorizeWindow.close()
            if (onFailure) {
              onFailure()
            }
            reject()
          }
        },
        500,
        authorizeWindow,
        resolve,
        resolve
      )
    })

    return promise
  }
}

function authCookiesSet() {
  return Cookies.get('X-User-Email') && Cookies.get('X-User-Token')
}

function authorizationFailed({ message, onFailure }) {
  return dispatch => {
    const promises = [dispatch(closeDialog()), dispatch(addMessage(message))]

    if (onFailure) {
      append(dispatch(onFailure), promises)
    }

    return Promise.all(promises)
  }
}

function processAuthorization({ onSuccess, onFailure }) {
  return dispatch => {
    const promises = [dispatch(oauthDone())]

    if (Cookies.get('X-User-Token')) {
      if (onSuccess) {
        append(dispatch(onSuccess, promises))
      }
    } else {
      append(
        dispatch(
          authorizationFailed({
            message: 'Authorization failed or was canceled.',
            onFailure
          })
        ),
        promises
      )
    }

    return Promise.all(promises)
  }
}

function oauthStart({ integrationName }) {
  return {
    type: ActionTypes.OAUTH_START,
    payload: { integrationName }
  }
}

export function oauthDone() {
  return {
    type: ActionTypes.OAUTH_DONE
  }
}
