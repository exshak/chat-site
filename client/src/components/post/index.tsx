import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  withStyles
} from '@material-ui/core'
import { Chat } from '@material-ui/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MyButton from '../common/button'
import PostDialog from '../postDialog'
import DeletePost from './deletePost'
import LikePost from './likePost'
import { postStyles } from './styles'

dayjs.extend(relativeTime)

const Post = ({
  classes,
  currentUser,
  isAuthenticated,
  post: { _id, name, image, title, user, comments, likes, createdAt }
}: any) => (
  <Card className={classes.card}>
    <CardMedia image={image} title='Profile image' className={classes.image} />
    <CardContent className={classes.content}>
      <Typography variant='h5'>{title}</Typography>
      {isAuthenticated && currentUser._id === user && (
        <DeletePost postId={_id} />
      )}
      <Typography variant='body2' color='textSecondary'>
        {dayjs(createdAt).fromNow()}
        {' by '}
        <Typography
          variant='body2'
          color='primary'
          component={Link}
          to={`/users/${user}`}
        >
          {name}
        </Typography>
      </Typography>
      <LikePost postId={_id} likes={likes} />
      <span>{likes && likes.length} likes</span>
      <MyButton tip='comments'>
        <Chat color='primary' />
      </MyButton>
      <span>{comments && comments.length} comments</span>
      <PostDialog postId={_id} />
    </CardContent>
  </Card>
)

Post.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = ({ user: { currentUser, isAuthenticated } }: any) => ({
  currentUser,
  isAuthenticated
})

export default connect(mapStateToProps, null)(withStyles(postStyles)(Post))
