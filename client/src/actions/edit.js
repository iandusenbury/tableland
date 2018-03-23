import { isEmpty } from 'ramda'
import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'

export function createThings(organization, experience, programs, userId) {
  return dispatch =>
    dispatch(createOrganization(organization)).then(response => {
      const { payload: { organization: { id: orgId } } } = response

      return dispatch(
        createExperience(experience, userId, { organizationId: orgId })
      ).then(() => { // eslint-disable-line
        const promises = []

        /* eslint-disable */
        if (!isEmpty(programs)) {
          const savePrograms =  async () => {
            for (const program of programs) {
              promises.push(await dispatch(
                createProgramExperience(program, experience, orgId, userId)
              ))
            }
          }

          savePrograms()
        }
        /* eslint-enable */

        if (promises.length === programs.length) {
          return Promise.all(promises)
        }
      })
    })
}

function createProgramExperience(program, experience, orgId, userId) {
  return dispatch =>
    dispatch(createProgram(program, orgId)).then(response => {
      const { payload: { program: { id } } } = response

      return dispatch(
        createExperience(program, userId, {
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

  return dispatch => dispatch(callApi(callDescriptor))
}

/* an action that PUTS/PATCH data for user's personal information */
// /users/{id} --is that the user's id??
export function updateUserInfo(info, userId) {
  const callDescriptor = {
    body: { ...info },
    endpoint: `/users/${userId}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_UPDATE_USER,
      ActionTypes.SUCCESS_UPDATE_USER,
      ActionTypes.FAILURE_UPDATE_USER
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

/* an action that PUTS/PATCH data for user's existing exp information */
export function updateUserExperience(experience, userId, expId) {
  const callDescriptor = {
    body: { ...experience },
    endpoint: `/users/${userId}/experiences/${expId}`,
    method: 'PUT',
    types: [
      ActionTypes.REQUEST_UPDATE_EXP,
      ActionTypes.SUCCESS_UPDATE_EXP,
      ActionTypes.FAILURE_UPDATE_EXP
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}

/*
export function changeUserVideo(link, userId, videoId, update) {
  if (update) {
    return dispatch => dispatch(updateUserVideo(link, userId, videoId))
  }
  return dispatch => dispatch(createUserVideo(link, userId))
}


export function createUserVideo(link, userId) {
  const callDescriptor = {
    body: { medium: { category: 'video', url: link } },
    endpoint: `/users/${userId}/media`,
    method: 'POST',
    types: [
      ActionTypes.REQUEST_CREATE_USER_VIDEO,
      ActionTypes.SUCCESS_CREATE_USER_VIDEO,
      ActionTypes.FAILURE_CREATE_USER_VIDEO
    ]
  }

  const onSuccess = (response, dispatch) =>
    dispatch(openDialog(1, { message: 'Success' }))

  return dispatch => dispatch(callApi(callDescriptor, { onSuccess }))
}
*/

export function updateUserVideo(link, userId, videoId) {
  const body = videoId
    ? { url: link }
    : { medium: { category: 'video', url: link } }
  const endpoint = videoId
    ? `/users/${userId}/media/${videoId}`
    : `/users/${userId}/media`
  const method = videoId ? 'PUT' : 'POST'
  const callDescriptor = {
    body,
    endpoint,
    method,
    types: [
      ActionTypes.REQUEST_UPDATE_USER_VIDEO,
      ActionTypes.SUCCESS_UPDATE_USER_VIDEO,
      ActionTypes.FAILURE_UPDATE_USER_VIDEO
    ]
  }

  return dispatch => dispatch(callApi(callDescriptor))
}
