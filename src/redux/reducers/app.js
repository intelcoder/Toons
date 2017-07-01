import { createReducer } from 'utils/reduxGenerator'
import { TOGGLE_LIKE } from 'redux/actions'
const initState = {
  isConnected: false,
  likeActivated: false,
}

const appReducer = createReducer(initState, {
  ['UPDATE_CONNECT_STATE'](state, action) {
    return {
      ...state,
      isConnected: action.newConnect,
    }
  },
  [TOGGLE_LIKE](state, action) {
    return {
      ...state,
      likeActivated: !state.likeActivated,
    }
  },
})

export default appReducer
