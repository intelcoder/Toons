import { makeActionCreator } from 'utils/reduxGenerator'
import { SITE_UPDATE, SITE_UPDATE_SUCCESS } from 'redux/types'

export const updateSite = makeActionCreator(SITE_UPDATE, 'site')
export const siteUpdated = makeActionCreator(
  SITE_UPDATE_SUCCESS,
  'site',
  'webtoons'
)
