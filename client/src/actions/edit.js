import ActionTypes from '../constants/actionTypes'
import callApi from '../utils/api'
import { openDialog } from './index'
import {isEmpty} from 'ramda'


export function createThings(organization, experience, programs, userId){
    return dispatch => dispatch(createOrganization(organization)).then(response => {
       console.log(response)
       //const { payload: {organization: {id as orgId} }} = response
        const orgId = response.payload.organization.id
        if(!isEmpty(programs)) {
            programs.map(program => {
                return dispatch(createProgram(program, orgId)).then(response => {
                    console.log(response)
                    const { payload:{program: {id}}} = response
                    return dispatch(createExperience(experience, userId, {programId: id, parentOrg: orgId}))
                })
            })
        }
        return dispatch(createExperience(experience, userId, {organizationId:orgId}))
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



export function createProgram(program, orgID) {
    const callDescriptor = {
        body: { program },
        endpoint: `/organizations/${orgID}/programs`,
        method: 'POST',
        types: [
            ActionTypes.REQUEST_CREATE_PROGRAM,
            ActionTypes.SUCCESS_CREATE_PROGRAM,
            ActionTypes.FAILURE_CREATE_PROGRAM
        ]
    }

    return dispatch => dispatch(callApi(callDescriptor))
}




export function createExperience(experience, userId, id){
    const callDescriptor = {
        body: { experience: {...experience , ...id} },
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
