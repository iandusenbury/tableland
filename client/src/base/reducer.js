import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import appReducer from '../modules/reducer'

export default combineReducers({
  app: appReducer,
  routing: routerReducer,
  form: formReducer
})
