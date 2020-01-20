import { Favorite, FavoriteBorder } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addLike, removeLike } from '../../redux/actions/postActions'
import MyButton from '../common/button'

const LikePost = ({
  postId,
  likes,
  currentUser,
  isAuthenticated,
  addLike,
  removeLike
}: any) => {
  const likePost = () => addLike(postId)
  const unlikePost = () => removeLike(postId)
  const isPostLiked = () => {
    return likes && likes.find((like: any) => like.user === currentUser._id)
  }

  return !isAuthenticated ? (
    <Link to='/login'>
      <MyButton tip='Like'>
        <FavoriteBorder color='primary' />
      </MyButton>
    </Link>
  ) : isPostLiked() ? (
    <MyButton tip='Unlike' onClick={unlikePost}>
      <Favorite color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likePost}>
      <FavoriteBorder color='primary' />
    </MyButton>
  )
}

LikePost.propTypes = {
  postId: PropTypes.string.isRequired,
  likes: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = ({ user: { currentUser, isAuthenticated } }: any) => ({
  currentUser,
  isAuthenticated
})

const mapDispatchToProps = (dispatch: any) => ({
  addLike: (postId: string) => dispatch(addLike(postId)),
  removeLike: (postId: string) => dispatch(removeLike(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(LikePost)
