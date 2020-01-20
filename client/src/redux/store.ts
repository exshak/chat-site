import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

const initialState = {}

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore FIXME:
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
)

export default store
