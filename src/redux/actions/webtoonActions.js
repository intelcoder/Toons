import { makeActionCreator } from 'utils/reduxGenerator'
import {
  SITE_UPDATE,
  SITE_UPDATE_SUCCESS,
  GET_EPISODES_DB,
  GET_EPISODES_DB_SUCCESS,
  GET_EPISODES_DB_FAIL,
  GET_EPISODES_API,
  WEBTOON_SELECTED,
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

export const setWebtoonId = makeActionCreator(WEBTOON_SELECTED, 'toonId')
