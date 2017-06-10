import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* dbInteraction() {
  yield takeLatest(LOGIN_REQUESTED, fetchData)
}

export default db
