import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { loginTypes } from '../types'
import { fetchToken } from 'utils/apis'
import { defaultModel } from 'models/model'

const { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAIL } = loginTypes

function* fetchData(action) {
  try {
    const { id, pwd } = action.payload
    const data = yield call(fetchToken, id, pwd)
    yield call(defaultModel.save, 'TOKEN', data)
    yield put({ type: LOGIN_SUCCESS, data })
  } catch (error) {
    yield put({ type: LOGIN_FAIL, error })
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN_REQUESTED, fetchData)
}

export default loginSaga
