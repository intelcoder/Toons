import { makeActionCreator } from 'utils/reduxGenerator'
import { INIT_START } from 'redux/types'

export const initStart = makeActionCreator(INIT_START)
