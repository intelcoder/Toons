import { makeActionCreator } from 'utils/reduxGenerator'
import { FETCH_WEBTOON_DB, SITE_CHANGED } from 'redux/types'

export const fetchWebtoonFromDb = makeActionCreator(FETCH_WEBTOON_DB, 'site')
export const siteChanged = makeActionCreator(SITE_CHANGED, 'site', 'webtoons')
