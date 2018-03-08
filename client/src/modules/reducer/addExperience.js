import createReducer from '../../utils/createReducer'
import ActionTypes from '../../constants/actionTypes'


const initialState = {
    newProgram: false,
    newExp: false
}

const handlers = {
    [ActionTypes.ADD_PROGRAM]: addProgram,
    [ActionTypes.ADD_EXP]: addExp
}

export default createReducer(initialState, handlers)

function addProgram(state){
    return {
        newProgram: true,
        newExp: false
    }
}

function addExp(state){
    return {
        newProgram: false,
        newExp: true
    }
}