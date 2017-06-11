import { makeActionCreator } from 'utils/reduxGenerator'
import { INIT_START } from 'redux/actions'

export const initStart = makeActionCreator(INIT_START)
