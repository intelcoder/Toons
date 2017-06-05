import { initTypes } from 'redux/types'

const {
  INIT_START,
  INIT_SUCCESS,
  INIT_FAIL,
  INIT_FETCH_START,
  INIT_IMAGE_SAVE_START,
  INIT_WEBTOON_SAVE_START,
} = initTypes

const initState = {
  isInitializing: false,
  status: null,
}

const initReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_START:
      return Object.assign({}, initState, {
        isInitializing: true,
        status: INIT_START,
      })

    case INIT_FETCH_START:
      return Object.assign({}, initState, {
        isInitializing: true,
        status: INIT_FETCH_START,
      })

    case INIT_IMAGE_SAVE_START:
      return Object.assign({}, initState, {
        isInitializing: true,
        status: INIT_IMAGE_SAVE_START,
      })

    case INIT_WEBTOON_SAVE_START:
      return Object.assign({}, initState, {
        isInitializing: true,
        status: INIT_WEBTOON_SAVE_START,
      })

    case INIT_SUCCESS:
      return Object.assign({}, initState, {
        isInitializing: false,
        status: INIT_SUCCESS,
      })

    case INIT_FAIL:
      return Object.assign({}, initState, {
        isInitializing: false,
        status: INIT_FAIL,
      })
  }
  return state
}

export default initReducer
