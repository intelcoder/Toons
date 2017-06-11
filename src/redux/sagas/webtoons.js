import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  SITE_UPDATE,
  WEBTOON_SELECTED,
  EPISODE_SELECTED,
  WEBTOON_UPDATED,
  EPISODE_UPDATED,
  TOON_IMAGES_UPDATED,
} from 'redux/types'
import { siteUpdated } from 'redux/actions'
import { defaultModel } from 'models/model'

function* fetchData(action) {
  if (action.site) {
    //update update site and try to fetch webtoons from db
  }
}

const dbFetchWebtoon = async site => {
  try {
    const naverToonIds = await defaultModel.getByKey(site)
    const naverToons = await defaultModel.getAllWebtoonInSite(
      site,
      naverToonIds
    )
    return naverToons
  } catch (e) {
    console.log('db site webtoon fetch fail ', e)
  }
}

function* fetchWebtoons(action) {
  const { site } = action
  const webtoons = yield call(dbFetchWebtoon, site)
  yield put(siteUpdated(site, webtoons))
}

function* fetchWebtoon() {
  yield takeLatest(SITE_UPDATE, fetchWebtoons)
}

function* webtoonSelected() {
  yield takeLatest(WEBTOON_SELECTED, fetchData)
}

function* episodeSelected() {
  yield takeLatest(EPISODE_SELECTED, fetchData)
}

function* webtoonsUpdated() {
  yield takeLatest(WEBTOON_UPDATED, fetchData)
}

function* episodesUpdated() {
  yield takeLatest(EPISODE_UPDATED, fetchData)
}

function* toonImageUpdated() {
  yield takeLatest(TOON_IMAGES_UPDATED, fetchData)
}
export default all([
  fetchWebtoon(),
  webtoonSelected(),
  episodeSelected(),
  webtoonsUpdated(),
  episodesUpdated(),
  toonImageUpdated(),
])
