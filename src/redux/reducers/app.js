import { createReducer } from 'utils/reduxGenerator'
import { TOGGLE_LIKE, TOGGLE_BASE_URL_MODAL } from 'redux/actions'
const initState = {
  isConnected: false,
  likeActivated: false,
  showBaseUrlModal: false,
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
  [TOGGLE_BASE_URL_MODAL](state, action) {
    return {
      ...state,
      showBaseUrlModal: !state.showBaseUrlModal,
    }
  },
})

export default appReducer
