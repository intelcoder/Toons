import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  fork,
  race,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
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
import moment from 'moment'
import { UPDATE_ALL_FAV_EPISODE_TOON } from 'redux/actions'
import { ToastAndroid } from 'react-native'
import {
  siteUpdated,
  getEpisodesDbSuccess,
  getToonImageApiSuccess,
  getToonImageApiFail,
  getEpisodesApiFail,
} from 'redux/actions'
import { defaultModel } from 'models/model'
import { urlTypes, weekdaysEng } from 'models/data'
import { getToonRequest } from 'utils/apis'
import { saveEpisodeImage, saveToonImageToLocal } from 'utils/saveImage'
import {
  extractValueFromObjArray,
  createRequestUrl,
  isTokenValid,
  getEpisodeBaseKey,
} from 'utils'

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
  const { site, toonId, episodeKey } = action
  const tokenDetail = yield select(state => state.login.tokenDetail)
  const requestUrl = yield call(createRequestUrl, urlTypes.EPISODE, toonId)
  const { result, timeout } = yield race({
    result: call(getToonRequest, requestUrl, tokenDetail),
    timeout: call(delay, 1000),
  })
  if (result) {
    const savedEpisodes = yield call(
      saveEpisodeToDb,
      episodeKey,
      toonId,
      result.episodes
    )
    yield put(getEpisodesDbSuccess(savedEpisodes))
    return { [toonId]: savedEpisodes }
  }
  yield put(getEpisodesApiFail())
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
  const { toonId, episodeNo } = action
  const tokenDetail = yield select(state => state.login.tokenDetail)
  const requestUrl = yield call(
    createRequestUrl,
    urlTypes.TOON_IMAGE,
    toonId,
    episodeNo
  )
  const result = yield call(getToonRequest, requestUrl, tokenDetail)

  const toonImageData = yield call(
    saveToonImagesToDb,
    toonId,
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
  } else if (isConnected && isTokenValid(login)) {
    yield put({ type: GET_TOON_IMAGES_API, episodeNo: episodeNo })
  }
}

function* fetchWebtoon() {
  yield takeLatest(SITE_UPDATE, fetchWebtoons)
}

function* fetchEpisodesApi() {
  yield takeEvery(GET_EPISODES_API, getEpisodesApi)
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

function* updateAllFavEpisodeToon() {
  yield takeLatest(UPDATE_ALL_FAV_EPISODE_TOON, updateAllFav)
}

function* updateAllFav() {
  const baseUrl = yield call(createRequestUrl)
  const weekdayIndex = moment().weekday()
  const tokenDetail = yield select(state => state.login.tokenDetail)
  const res = yield call(
    getToonRequest,
    baseUrl + `favorite?weekday=${weekdaysEng[weekdayIndex]}`,
    tokenDetail
  )
  if (!res.detail) {
    const savedEpisodes = yield all(
      res.map(fav => {
        const episodeKey = getEpisodeBaseKey(fav.site, fav.toon_id)
        return call(getEpisodesApi, {
          site: fav.site,
          toonId: fav.toon_id,
          episodeKey: episodeKey,
        })
      })
    )
    const flattenEpisodeList = Object.assign(...savedEpisodes)
    const toonImageKeyLists = yield all(
      Object.keys(flattenEpisodeList).map(id => {
        return fork(getToonImagesApi, {
          toonId: id,
          episodeNo: flattenEpisodeList[id][0].no,
        })
      })
    )
    ToastAndroid.show('Done Updating', ToastAndroid.SHORT)
  }
}

function* favoriteWatcher() {}

// function* getToonImagesApi(action) {
//   const { toonId, episodeNo } = action
export default all([
  fetchWebtoon(),
  fetchEpisodesApi(),
  fetchEpisodesDb(),
  webtoonSelected(),
  episodeSelected(),
  webtoonsUpdated(),
  episodesUpdated(),
  fetchToonImagesDb(),
  fork(updateAllFavEpisodeToon),
])
