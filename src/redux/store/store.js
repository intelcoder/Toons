/**
 * Created by fiddlest on 5/22/2017.
 */
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import reducers from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

const store = createStore(reducers, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)
store.dispatch({ type: 'REQUEST_TOKEN' })
export default store
