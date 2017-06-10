import { SITE_CHANGED } from 'redux/types'

export const siteUpdate = payload => {
  return {
    type: SITE_CHANGED,
    payload: payload,
  }
}
