// generates reducers to reducer boilerplate code
// see https://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-reducers

/* eslint-disable no-prototype-builtins */
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}
