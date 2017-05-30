import { all } from 'redux-saga/effects'
import login from './login'
import init from './init'

export default function* rootSaga() {
  yield all([login(), init()])
}
