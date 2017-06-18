import { ToastAndroid } from 'react-native'
import { createRequestUrl } from 'utils'
import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  select,
} from 'redux-saga/effects'
import {
  INIT_START,
  INIT_SUCCESS,
  INIT_FAIL,
  INIT_FETCH_START,
  INIT_IMAGE_SAVE_START,
  INIT_WEBTOON_SAVE_START,
} from 'redux/types'
import { extractValueFromObjArray } from 'utils'
import { getToonRequest } from 'utils/apis'
import { urlTypes, siteList } from 'models/data'
import { defaultModel } from 'models/model'
import { saveThumbsToLocal } from 'utils/saveImage'
const getLogin = state => state.login

const updateSite = webtoon => {
  webtoon.site = webtoon.site.name
  return webtoon
}

async function saveImage(webtoons) {
  let updatedWebtoons
  try {
    //Update webtoon data and save thumbnail_url to local
    updatedWebtoons = webtoons.map(updateSite).map(saveThumbsToLocal)
    return await Promise.all(updatedWebtoons)
  } catch (err) {
    return ToastAndroid.show(
      'Error occurred on saving images',
      ToastAndroid.LONG
    )
  }
}

function saveWebtoonIntoLocal(webtoons) {
  let sites = siteList.reduce((acc, site) => {
    acc[site] = []
    return acc
  }, {})

  const webtoonsBySite = webtoons.map(webtoon => {
    sites[webtoon.site].push(webtoon)
  })

  const savePromises = Object.keys(sites)
    .map(site => {
      const toonids = extractValueFromObjArray(sites[site], 'toon_id')
      defaultModel.save(site, toonids)
      return sites[site].map(webtoon => {
        const key = [site, webtoon.toon_id].join(':')
        return defaultModel.save(key, webtoon)
      })
    })
    .reduce((acc, promises) => {
      return acc.concat(promises)
    }, [])

  return Promise.all(savePromises)
}

function* startInit(action) {
  try {
    const login = yield select(getLogin)
    yield put({ type: INIT_FETCH_START })
    const requestUrl = createRequestUrl(urlTypes.List)
    const result = yield call(getToonRequest, requestUrl, login.tokenDetail)
    yield put({ type: INIT_IMAGE_SAVE_START })
    const webtoonsWithImagePath = yield call(saveImage, result)
    yield put({ type: INIT_WEBTOON_SAVE_START })
    const save = yield call(saveWebtoonIntoLocal, webtoonsWithImagePath)
    yield put({ type: INIT_SUCCESS })
  } catch (e) {
    yield put({ type: INIT_FAIL })
    console.log('error', e)
  }
}

function* watchInit() {
  yield takeEvery(INIT_START, startInit)
}

export default watchInit
