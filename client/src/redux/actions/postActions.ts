import axios from 'axios'
import { CLEAR_ERROR, PostActionTypes } from '../types'

// Create post
export const createPost = ({ title, body }: any) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const payload = JSON.stringify({ title, body })

  try {
    const response = await axios.post('/api/posts', payload, config)

    dispatch({
      type: PostActionTypes.CREATE_POST,
      payload: response.data
    })

    dispatch(clearError())
  } catch (error) {
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: error.response.data
    })
  }
}

// Delete post
export const deletePost = (postId: string) => async (dispatch: any) => {
  try {
    await axios.delete(`/api/posts/${postId}`)

    dispatch({
      type: PostActionTypes.DELETE_POST,
      payload: postId
    })

    dispatch(clearError())
  } catch (error) {
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: error.response.data
    })
  }
}

// Get all posts
export const getPosts = () => async (dispatch: any) => {
  try {
    const response = await axios.get('/api/posts')

    dispatch({
      type: PostActionTypes.FETCH_POSTS,
      payload: response.data
    })

    dispatch(clearError())
  } catch (error) {
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: error.response.data
    })
  }
}

// Get one post
export const getPost = (postId: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`/api/posts/${postId}`)

    dispatch({
      type: PostActionTypes.FETCH_POST,
      payload: response.data
    })

    dispatch(clearError())
  } catch (error) {
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: error.response.data
    })
  }
}

// Comment on post
export const addComment = (postId: string, comment: object) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await axios.post(
      `/api/posts/comment/${postId}`,
      comment,
      config
    )

    dispatch({
      type: PostActionTypes.CREATE_COMMENT,
      payload: response.data
    })

    dispatch(getPost(postId))
  } catch (error) {
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: error.response.data
    })
  }
}

// Delete comment
export const deleteComment = (postId: string, commentId: any) => async (
  dispatch: any
) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

    dispatch({
      type: PostActionTypes.DELETE_COMMENT,
      payload: commentId
    })

    dispatch(getPost(postId))
  } catch (error) {
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: error.response.data
    })
  }
}

// Like post
export const addLike = (postId: string) => async (dispatch: any) => {
  try {
    const response = await axios.put(`/api/posts/like/${postId}`)

    dispatch({
      type: PostActionTypes.UPDATE_LIKES,
      payload: { postId, likes: response.data }
    })

    dispatch(getPost(postId))
  } catch (error) {
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: error.response.data
    })
  }
}

// Unlike post
export const removeLike = (postId: string) => async (dispatch: any) => {
  try {
    const response = await axios.put(`/api/posts/unlike/${postId}`)

    dispatch({
      type: PostActionTypes.UPDATE_LIKES,
      payload: { postId, likes: response.data }
    })

    dispatch(getPost(postId))
  } catch (error) {
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: error.response.data
    })
  }
}

// Clear errors
export const clearError = () => (dispatch: any) => {
  dispatch({ type: CLEAR_ERROR })
}
