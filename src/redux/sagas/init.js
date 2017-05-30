import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  select,
} from 'redux-saga/effects'
import { initTypes } from 'redux/types'
import { getToonRequest } from 'utils/apis'
import { urlTypes } from 'models/data'

const { START_INIT } = initTypes

const getLogin = state => state.login

function* startInit(action) {
  try {
    const login = yield select(getLogin)
    const result = yield call(getToonRequest, urlTypes.LIST, login.tokenDetail)
    
  } catch (e) {
    console.log('error', e)
  }

  //const webtoons = yield call(getToonRequest, )
}

function* watchInit() {
  yield takeEvery(START_INIT, startInit)
}

export default watchInit
