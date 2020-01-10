import axios from 'axios'
import UserActionTypes from '../types'

export const signUpStart = ({ name, email, password }: any) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const response = await axios.post('/api/signup', body, config)

    dispatch({
      type: UserActionTypes.SIGN_UP_SUCCESS,
      payload: response.data
    })

    setAuthHeader(response.data.token)

    dispatch(getCurrentUser())
  } catch (error) {
    dispatch({
      type: UserActionTypes.SIGN_UP_FAILURE,
      payload: error.response.data
    })
  }
}

export const signInStart = ({ email, password }: any) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const response = await axios.post('/api/signin', body, config)

    dispatch({
      type: UserActionTypes.SIGN_IN_SUCCESS,
      payload: response.data
    })

    setAuthHeader(response.data.token)

    dispatch(getCurrentUser())
  } catch (error) {
    dispatch({
      type: UserActionTypes.SIGN_IN_FAILURE,
      payload: error.response.data
    })
  }
}

export const getCurrentUser = () => async (dispatch: any) => {
  try {
    const response = await axios.get('/api/user')

    dispatch({
      type: UserActionTypes.SET_CURRENT_USER,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: UserActionTypes.USER_AUTH_ERROR,
      payload: error.response.data
    })
  }
}

export const signOutStart = () => (dispatch: any) => {
  try {
    localStorage.removeItem('token')

    delete axios.defaults.headers.common['Authorization']

    dispatch({ type: UserActionTypes.SIGN_OUT_SUCCESS })
  } catch (error) {
    dispatch({
      type: UserActionTypes.SIGN_OUT_FAILURE,
      payload: error.response.data
    })
  }
}

const setAuthHeader = (token: any) => {
  const accessToken = `Bearer ${token}`
  localStorage.setItem('token', accessToken)
  axios.defaults.headers.common['Authorization'] = accessToken
}
