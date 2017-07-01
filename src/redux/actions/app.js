import { makeActionCreator } from 'utils/reduxGenerator'

export const TOGGLE_LIKE = 'TOGGLE_LIKE'
export const activateLike = makeActionCreator(TOGGLE_LIKE)

export const TOGGLE_BASE_URL_MODAL = 'TOGGLE_BASE_URL_MODAL'
export const toggleBaseUrlModal = makeActionCreator(TOGGLE_BASE_URL_MODAL)
