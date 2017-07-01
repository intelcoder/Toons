import { createReducer } from 'utils/reduxGenerator'
import { siteList } from 'models/data'
import {
  SITE_UPDATE,
  SITE_UPDATE_SUCCESS,
  WEBTOON_SELECTED,
  EPISODE_SELECTED,
  WEBTOON_UPDATED,
  EPISODE_UPDATED,
  TOON_IMAGES_UPDATED,
  GET_EPISODES_DB_SUCCESS,
  GET_TOON_IMAGES_API,
  GET_TOON_IMAGES_API_SUCCESS,
  GET_EPISODES_API_FAIL,
} from 'redux/types'

const webtoonObj = siteList.reduce((acc, site) => {
  acc[site] = []
  return acc
}, {})

const initState = {
  site: 'naver',
  selectedWebtoon: '',
  selectedEpisodes: '',
  webtoons: webtoonObj,
  episodes: [],
  toonImages: [],
  isFetching: false,
  isFailed: false,
}

const webtoonReducer = createReducer(initState, {
  [SITE_UPDATE](state, action) {
    return {
      ...state,
      isFetching: true,
    }
  },
  [SITE_UPDATE_SUCCESS](state, action) {
    const { site, webtoons } = action
    return {
      ...state,
      isFetching: false,
      site: site,
      webtoons: {
        ...state.webtoons,
        [site]: [...webtoons],
      },
    }
  },
  [GET_EPISODES_DB_SUCCESS](state, action) {
    const { episodes } = action

    return {
      ...state,
      episodes: episodes,
    }
  },
  [GET_EPISODES_API_FAIL](state, action) {
    return {
      ...state,
      isFailed: true,
      episodes: [],
    }
  },
  [WEBTOON_SELECTED](state, action) {
    const { toonId } = action
    return {
      ...state,
      selectedWebtoon: toonId,
      episodes: [],
    }
  },
  [EPISODE_SELECTED](state, action) {
    const { episodeNo } = action
    return {
      ...state,
      selectedEpisodes: episodeNo,
      toonImages: [],
    }
  },
  [GET_TOON_IMAGES_API](state, action) {
    const { episodeNo } = action
    return {
      ...state,
      toonImages: [],
    }
  },
  [GET_TOON_IMAGES_API_SUCCESS](state, action) {
    const { toonImageList } = action
    return {
      ...state,
      toonImages: toonImageList,
    }
  },
})

export default webtoonReducer
