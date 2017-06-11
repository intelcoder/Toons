import { createReducer } from 'utils/reduxGenerator'
import { siteList } from 'models/data'
import {
  SITE_UPDATE_SUCCESS,
  WEBTOON_SELECTED,
  EPISODE_SELECTED,
  WEBTOON_UPDATED,
  EPISODE_UPDATED,
  TOON_IMAGES_UPDATED,
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
}

const webtoonReducer = createReducer(initState, {
  [SITE_UPDATE_SUCCESS](state, action) {
    const { site, webtoons } = action
    return {
      ...state,
      site: site,
      webtoons: {
        ...state.webtoons,
        [site]: [...webtoons],
      },
    }
  },
})

export default webtoonReducer
