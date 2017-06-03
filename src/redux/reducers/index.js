/**
 * Created by fiddlest on 5/22/2017.
 */
import { combineReducers } from 'redux'
import navReducer from './navigator'
import loginReducer from './loginReducer'

export default combineReducers({
  nav: navReducer,
  login: loginReducer,
})
