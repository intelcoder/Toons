import { makeActionCreator } from 'utils/reduxGenerator'
import { FETCH_WEBTOON_DB } from 'redux/types'

export const fetchWebtoonFromDb = makeActionCreator(FETCH_WEBTOON_DB, 'site')
