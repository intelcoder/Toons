/**
 * Created by fiddlest on 3/1/2017.
 */

import moment from 'moment'
import { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAIL } from 'redux/types'

const initState = {
  hasToken: false,
  isFetching: false,
  tokenReceivedAt: null,
  status: null,
  tokenDetail: {},
  error: '',
}

export default (state = initState, action) => {
  if (action.type === LOGIN_REQUESTED) {
    return Object.assign({}, state, { isFetching: true, error: '' })
  } else if (action.type === LOGIN_SUCCESS) {
    return Object.assign({}, state, {
      isFetching: false,
      hasToken: true,
      status: 'success',
      tokenReceivedAt: moment().unix(),
      tokenDetail: action.data,
      error: '',
    })
  } else if (action.type === LOGIN_FAIL) {
    return Object.assign({}, state, {
      status: 'fail',
      isFetching: false,
      error: action.error,
    })
  }

  return state
}
