import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'

const initialState = {
    organization: {
        id: 1,
        name: 'Intel',
        description: 'Giant Company',
        url: 'https://intel.com',
        address: 'intel address',
        city: 'beaverton',
        state: 'OR',
        country: 'USA',
        postalCode: '97006',
        media: 'https://www.youtube.com/watch?v=Fbld8NAZQ5E',
        employees: [
            {
                id: 1,
                first: 'John',
                last: 'Bob',
                title: 'anchor'
            }
        ]
    }
}

const handlers = {
    // Pattern:
    // [ActionTypes.ACTION_NAME]: actionFunction
    [ActionTypes.RECEIVE_INITIAL_ORG_DATA]: requestData
}

export default createReducer(initialState, handlers)

function requestData(state, payload) {
    const { payload: {organization} } = payload

    return {
        ...state,
        ...organization
    }
}