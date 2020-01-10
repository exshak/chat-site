import UserActionTypes from '../types'

const initialState = {
  currentUser: null,
  isAuthenticated: null,
  loading: null
}

const userReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        loading: false
      }
    case UserActionTypes.SIGN_UP_SUCCESS:
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: true
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: false,
        isAuthenticated: false,
        loading: false
      }
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      }

    default:
      return state
  }
}

export default userReducer
