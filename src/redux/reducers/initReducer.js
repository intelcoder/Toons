import { createReducer } from 'utils/reduxGenerator'

import {
  INIT_START,
  INIT_SUCCESS,
  INIT_FAIL,
  INIT_FETCH_START,
  INIT_IMAGE_SAVE_START,
  INIT_WEBTOON_SAVE_START,
} from 'redux/types'

const initState = {
  isInitializing: false,
  status: null,
}

const initReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_START:
      return {
        ...initState,
        isInitializing: true,
        status: INIT_START,
      }

    case INIT_FETCH_START:
      return {
        ...initState,
        isInitializing: true,
        status: INIT_FETCH_START,
      }

    case INIT_IMAGE_SAVE_START:
      return {
        ...initState,
        isInitializing: true,
        status: INIT_IMAGE_SAVE_START,
      }

    case INIT_WEBTOON_SAVE_START:
      return {
        ...initState,
        isInitializing: true,
        status: INIT_WEBTOON_SAVE_START,
      }

    case INIT_SUCCESS:
      return {
        ...initState,
        isInitializing: false,
        status: INIT_SUCCESS,
      }

    case INIT_FAIL:
      return {
        ...initState,
        isInitializing: false,
        status: INIT_FAIL,
      }
  }
  return state
}

export default initReducer
