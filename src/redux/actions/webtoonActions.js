import { makeActionCreator } from 'utils/reduxGenerator'
import {
  SITE_UPDATE,
  SITE_UPDATE_SUCCESS,
  GET_EPISODES_DB,
  GET_EPISODES_DB_SUCCESS,
  GET_EPISODES_DB_FAIL,
  GET_EPISODES_API,
  WEBTOON_SELECTED,
  GET_TOON_IMAGES_API,
  EPISODE_SELECTED,
  GET_TOON_IMAGES_API_SUCCESS,
  GET_TOON_IMAGES_API_FAIL,
  GET_TOON_IMAGES_DB,
} from 'redux/types'

export const updateSite = makeActionCreator(SITE_UPDATE, 'site')
export const siteUpdated = makeActionCreator(
  SITE_UPDATE_SUCCESS,
  'site',
  'webtoons'
)

export const getEpisodesDb = makeActionCreator(GET_EPISODES_DB, 'episodeKeys')
export const getEpisodesDbSuccess = makeActionCreator(
  GET_EPISODES_DB_SUCCESS,
  'episodes'
)

export const getEpisodesApi = makeActionCreator(
  GET_EPISODES_API,
  'toonId',
  'episodeKey'
)

export const episodeSelected = makeActionCreator(EPISODE_SELECTED, 'episodeNo')

export const setWebtoonId = makeActionCreator(WEBTOON_SELECTED, 'toonId')

export const getToonImagesApi = makeActionCreator(GET_TOON_IMAGES_API)
export const getToonImageApiSuccess = makeActionCreator(
  GET_TOON_IMAGES_API_SUCCESS,
  'toonImageList'
)
export const getToonImageApiFail = makeActionCreator(GET_TOON_IMAGES_API_FAIL)

export const getToonImageDb = makeActionCreator(GET_TOON_IMAGES_DB)
