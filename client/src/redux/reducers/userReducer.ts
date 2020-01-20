import { UserActionTypes } from '../types'

const initialState = {
  currentUser: {},
  isAuthenticated: false,
  loading: false
}

const userReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UserActionTypes.SIGN_UP_SUCCESS:
    case UserActionTypes.SIGN_IN_SUCCESS:
    case UserActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        loading: true
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return initialState
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        loading: false
      }
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.USER_AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      }
    case UserActionTypes.PROFILE_ERROR:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}

export default userReducer
