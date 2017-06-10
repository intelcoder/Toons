import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import webtoonTypes from 'redux/types/webtoonsTypes'
const {
  SITE_CHANGED,
  WEBTOON_SELECTED,
  EPISODE_SELECTED,
  WEBTOON_UPDATED,
  EPISODE_UPDATED,
  TOON_IMAGES_UPDATED,
} = webtoonTypes

console.log(
  SITE_CHANGED,
  WEBTOON_SELECTED,
  EPISODE_SELECTED,
  WEBTOON_UPDATED,
  EPISODE_UPDATED,
  TOON_IMAGES_UPDATED
)
function* fetchData(action) {
  if (action.site) {
    //update update site and try to fetch webtoons from db
  }
}

function* siteChanged() {
  yield takeLatest(SITE_CHANGED, fetchData)
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
  siteChanged(),
  webtoonSelected(),
  episodeSelected(),
  webtoonsUpdated(),
  episodesUpdated(),
  toonImageUpdated(),
])
