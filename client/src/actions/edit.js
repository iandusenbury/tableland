import { isEmpty } from 'ramda'
import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'
import { openDialog } from './index'

export function createThings(organization, experience, programs, userId) {
  return dispatch =>
    dispatch(createOrganization(organization)).then(response => {
      const { payload: { organization: { id: orgId } } } = response

      /* eslint-disable */
      if (!isEmpty(programs)) {
        return async () => {
          for (const program of programs) {
            await dispatch(
              createProgramExperience(program, experience, orgId, userId)
            )
          }
        }
      }
      /* eslint-enable */

      return dispatch(
        createExperience(experience, userId, { organizationId: orgId })
      )
    })
}

function createProgramExperience(program, experience, orgId, userId) {
  return dispatch =>
    dispatch(createProgram(program, orgId)).then(response => {
      const { payload: { program: { id } } } = response

      return dispatch(
        createExperience(experience, userId, {
          programId: id,
          parentOrg: orgId
        })
      )
    })
}

export function createOrganization(organization) {
  const callDescriptor = {
    body: { organization },
    endpoint: `/organizations`,
    method: 'POST',
    types: [
      ActionTypes.REQUEST_CREATE_ORGANIZATION,
      ActionTypes.SUCCESS_CREATE_ORGANIZATION,
      ActionTypes.FAILURE_CREATE_ORGANIZATION
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function createProgram(program, orgId) {
  const callDescriptor = {
    body: { program },
    endpoint: `/organizations/${orgId}/programs`,
    method: 'POST',
    types: [
      ActionTypes.REQUEST_CREATE_PROGRAM,
      ActionTypes.SUCCESS_CREATE_PROGRAM,
      ActionTypes.FAILURE_CREATE_PROGRAM
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

export function createExperience(experience, userId, id) {
  const callDescriptor = {
    body: { experience: { ...experience, ...id } },
    endpoint: `/users/${userId}/experiences`,
    method: 'POST',
    types: [
      ActionTypes.REQUEST_CREATE_EXPERIENCE,
      ActionTypes.SUCCESS_CREATE_EXPERIENCE,
      ActionTypes.FAILURE_CREATE_EXPERIENCE
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch(openDialog(1, { message: 'Success' }))

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}

/* an action that PUTS/PATCH data for user's personal information */
// /users/{id} --is that the user's id??
export function updateUserInfo(info, userId) {
  const callDescriptor = {
    body: { ...info },
    endpoint: `/users/${userId}`,
    method: 'PUT/PATCH',
    types: [
      ActionTypes.REQUEST_UPDATE_USER,
      ActionTypes.SUCCESS_UPDATE_USER,
      ActionTypes.FAILURE_UPDATE_USER
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch(openDialog(1, { message: 'Success' }))

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}
