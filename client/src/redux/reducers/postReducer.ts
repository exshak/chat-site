import { CLEAR_ERROR, PostActionTypes } from '../types'

const initialState: any = {
  posts: [],
  post: {},
  loading: false
}

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case PostActionTypes.CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: true
      }
    case PostActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: any) => post._id !== payload),
        loading: true
      }
    case PostActionTypes.FETCH_POSTS:
      return { ...state, posts: payload, loading: true }
    case PostActionTypes.FETCH_POST:
      return { ...state, post: payload, loading: false }
    case PostActionTypes.CREATE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload }
      }
    case PostActionTypes.DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment: any) => comment._id !== payload
          )
        }
      }
    case PostActionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post: any) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        )
      }
    case PostActionTypes.POST_ERROR:
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
