import { makeActionCreator } from 'utils/reduxGenerator'

export const TOGGLE_LIKE = 'TOGGLE_LIKE'
export const activateLike = makeActionCreator(TOGGLE_LIKE)
