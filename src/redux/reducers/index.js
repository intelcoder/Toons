/**
 * Created by fiddlest on 5/22/2017.
 */
import { combineReducers } from 'redux'
import navReducer from './navigator'
import loginReducer from './loginReducer'
import initReducer from './initReducer'
import webtoonReducer from './webtoonReducer'
import app from './app'

export default combineReducers({
  nav: navReducer,
  login: loginReducer,
  init: initReducer,
  webtoon: webtoonReducer,
  app: app
})
