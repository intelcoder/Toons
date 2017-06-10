import { all } from 'redux-saga/effects'
import login from './login'
import init from './init'
import webtoons from './webtoons'

export default function* rootSaga() {
  yield all([login(), init()])
}
