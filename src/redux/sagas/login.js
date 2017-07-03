import {
  call,
  put,
  takeLatest,
  select,
  race,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAIL } from 'redux/types'
import { fetchToken } from 'utils/apis'
import { defaultModel } from 'models/model'

function* requestLogin(action) {
  console.log("test requrest login")
  try {
    const { id, pwd } = action.payload
    const { data, timeout } = yield race({
      data: call(fetchToken, id, pwd),
      timeout: call(delay, 1000),
    })

    if (data) {
      yield put({ type: LOGIN_SUCCESS, data })
      const login = yield select(state => state.login)
      return yield call(defaultModel.save, 'TOKEN', login)
    }
    yield put({ type: LOGIN_FAIL, error:'Request Failed' })
  } catch (error) {
    yield put({ type: LOGIN_FAIL, error })
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN_REQUESTED, requestLogin)
}

export default loginSaga
