import { combineReducers } from 'redux'
import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer
})

export default rootReducer
