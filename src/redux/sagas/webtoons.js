import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects'
import {
  SITE_UPDATE,
  WEBTOON_SELECTED,
  EPISODE_SELECTED,
  WEBTOON_UPDATED,
  EPISODE_UPDATED,
  TOON_IMAGES_UPDATED,
  GET_EPISODES_DB,
  GET_EPISODES_API,
  GET_TOON_IMAGES_DB,
  GET_TOON_IMAGES_API,
} from 'redux/types'
import {
  siteUpdated,
  getEpisodesDbSuccess,
  getToonImageApiSuccess,
  getToonImageApiFail,
} from 'redux/actions'
import { defaultModel } from 'models/model'
import { urlTypes } from 'models/data'
import { getToonRequest } from 'utils/apis'
import { saveEpisodeImage, saveToonImageToLocal } from 'utils/saveImage'
import { extractValueFromObjArray, createRequestUrl, isTokenValid } from 'utils'

function* fetchData(action) {
  if (action.site) {
    //update update site and try to fetch webtoons from db
  }
}

const dbFetchWebtoon = async site => {
  try {
    const naverToonIds = await defaultModel.getByKey(site)
    const webtoonKeys = naverToonIds.map(webtoonId => {
      return [site, webtoonId].join(':')
    })
    const naverToons = await defaultModel.getAllWithKeys(webtoonKeys)
    return naverToons
  } catch (e) {
    console.log('db site webtoon fetch fail ', e)
  }
}

const dbFetchEpisodes = async episodeKeys => {
  try {
    const naverToons = await defaultModel.getAllWithKeys(episodeKeys)
    return naverToons
  } catch (e) {
    console.log('db site webtoon fetch fail ', e)
  }
}

const saveEpisodeToDb = async (episodeBaseKey, toonId, episodes) => {
  const noList = extractValueFromObjArray(episodes, 'no')
  //save episodes keys
  defaultModel.save(episodeBaseKey, noList)
  //Save each episode infomation with image;
  const saveImagePromises = episodes.reduce((promises, episode) => {
    promises.push(saveEpisodeImage(toonId, episode))
    return promises
  }, [])

  try {
    const listOfEpisode = await Promise.all(saveImagePromises)
    const saveEpisodePromises = listOfEpisode.map(episode => {
      const episodeKey = [episodeBaseKey, episode.no].join(':')
      return defaultModel.save(episodeKey, episode)
    })
    //wait for all the episodes to be saved
    const saved = await Promise.all(saveEpisodePromises)
    return listOfEpisode
  } catch (e) {
    console.log('saveEpisodeToDb error occurred', e)
  }
}

function* fetchWebtoons(action) {
  const { site } = action
  const webtoons = yield call(dbFetchWebtoon, site)
  yield put(siteUpdated(site, webtoons))
}

function* getEpisodesDb(action) {
  const { episodeKeys } = action
  const site = yield select(state => state.webtoon.site)
  const episodes = yield call(dbFetchEpisodes, episodeKeys)
  yield put(getEpisodesDbSuccess(episodes))
}

function* getEpisodesApi(action) {
  const { toonId, episodeKey } = action
  const site = yield select(state => state.webtoon.site)
  const tokenDetail = yield select(state => state.login.tokenDetail)
  const requestUrl = yield call(createRequestUrl, urlTypes.EPISODE, toonId)
  const result = yield call(getToonRequest, requestUrl, tokenDetail)
  console.log(result)
  const savedEpisodes = yield call(
    saveEpisodeToDb,
    episodeKey,
    toonId,
    result.episodes
  )
  yield put(getEpisodesDbSuccess(savedEpisodes))
}

async function saveToonImagesToDb(toonId, episodeNo, imageList) {
  const savePromises = imageList.map(imageObj => {
    return saveToonImageToLocal(imageObj, toonId, episodeNo)
  })

  try {
    const toonImageData = await Promise.all(savePromises)
    const saveIntoLocal = defaultModel.save(
      `webtoon:${toonId}:ep:${episodeNo}:toon`,
      toonImageData
    )
    const saved = Promise.all(saveIntoLocal)
    return toonImageData
  } catch (e) {
    console.log('error occured saving toonList', e)
  }
}
async function getImageListFromStorage(toonId, episodeNo) {
  const imageLists = await defaultModel.getByKey(
    `webtoon:${toonId}:ep:${episodeNo}:toon`
  )

  if (imageLists) {
    return imageLists
  }
  return []
}

function* getToonImagesApi(action) {
  const { episodeNo } = action
  const webtoonId = yield select(state => state.webtoon.selectedWebtoon)
  const tokenDetail = yield select(state => state.login.tokenDetail)
  const requestUrl = yield call(
    createRequestUrl,
    urlTypes.TOON_IMAGE,
    webtoonId,
    episodeNo
  )
  const result = yield call(getToonRequest, requestUrl, tokenDetail)

  const toonImageData = yield call(
    saveToonImagesToDb,
    webtoonId,
    episodeNo,
    result
  )
  if (result) {
    yield put(getToonImageApiSuccess(toonImageData))
  }
}

function* getToonImagesDb(action) {
  const { episodeNo, toonImages } = action
  const isConnected = yield select(state => state.app.isConnected)
  const login = yield select(state => state.login)
  if (toonImages) {
    yield put(getToonImageApiSuccess(toonImages))
  } else if( isConnected && isTokenValid(login)) {
    yield put({ type: GET_TOON_IMAGES_API, episodeNo: episodeNo })
  }
}

function* fetchWebtoon() {
  yield takeLatest(SITE_UPDATE, fetchWebtoons)
}

function* fetchEpisodesApi() {
  yield takeLatest(GET_EPISODES_API, getEpisodesApi)
}

function* fetchEpisodesDb() {
  yield takeLatest(GET_EPISODES_DB, getEpisodesDb)
}

function* webtoonSelected() {
  yield takeLatest(WEBTOON_SELECTED, fetchData)
}

function* webtoonsUpdated() {
  yield takeLatest(WEBTOON_UPDATED, fetchData)
}

function* episodesUpdated() {
  yield takeLatest(EPISODE_UPDATED, fetchData)
}

function* fetchToonImagesDb() {
  yield takeLatest(GET_TOON_IMAGES_DB, getToonImagesDb)
}

function* episodeSelected() {
  yield takeLatest(GET_TOON_IMAGES_API, getToonImagesApi)
}

export default all([
  fetchWebtoon(),
  fetchEpisodesApi(),
  fetchEpisodesDb(),
  webtoonSelected(),
  episodeSelected(),
  webtoonsUpdated(),
  episodesUpdated(),
  fetchToonImagesDb(),
])
