/**
 * Created by fiddlest on 5/31/2017.
 */
const initState = {
  isFetching: false,
  isFail: false,
  data: [],
}

/**
 * This reducer takes care of  network request
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initState, action) => {
  if (action.type === 'FETCH_DATA') {
    return Object.assign({}, state, {
      isFetching: true,
      isFail: false,
    })
  } else if (action.type === 'FETCH_DATA_SUCCESS') {
    return Object.assign({}, state, {
      isFetching: false,
      isFail: false,
      data: action.data,
    })
  } else if (action.type === 'FETCH_DATA_FAILURE') {
    return Object.assign({}, state, {
      isFetching: false,
      isFail: true,
    })
  }
  return state
}
