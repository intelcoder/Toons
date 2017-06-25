import { createReducer } from 'utils/reduxGenerator'

const initState = {
  isConnected: false,
}

const appReducer = createReducer(initState, {
  ['UPDATE_CONNECT_STATE'](state, action) {
    return {
      ...state,
      isConnected: action.newConnect,
    }
  },
})


export default appReducer