import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* dbInteraction() {
  yield takeLatest('login', fetchData)
}

export default db
