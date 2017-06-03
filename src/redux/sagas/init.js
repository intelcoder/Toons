import { ToastAndroid } from 'react-native'

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
import { urlTypes, siteList } from 'models/data'
import { defaultModel } from 'models/model'
import { saveThumbsToLocal } from 'utils/saveImage'

const { START_INIT } = initTypes

const getLogin = state => state.login

const updateSite = webtoon => {
  webtoon.site = webtoon.site.name
  return webtoon
}

async function saveInitLocal(webtoons) {
  let updatedWebtoons
  let sites = siteList.reduce((acc, site) => {
    acc[site] = []
    return acc
  }, {})

  //console.log('saveInitLocal',webtoons)

  try {
    //Update webtoon data and save thumbnail_url to local
    updatedWebtoons = webtoons.map(updateSite).map(saveThumbsToLocal)
    updatedWebtoons = await Promise.all(updatedWebtoons)
  } catch (err) {
    return ToastAndroid.show(
      'Error occurred on saving images',
      ToastAndroid.LONG
    )
  }
}

function* startInit(action) {
  try {
    const login = yield select(getLogin)
    const result = yield call(getToonRequest, urlTypes.LIST, login.tokenDetail)
    const saveResult = yield call(saveInitLocal, result)
  } catch (e) {
    console.log('error', e)
  }

  //const webtoons = yield call(getToonRequest, )
}

function* watchInit() {
  yield takeEvery(START_INIT, startInit)
}

export default watchInit
