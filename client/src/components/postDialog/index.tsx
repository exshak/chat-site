import {
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core'
import { Chat, Close, UnfoldMore } from '@material-ui/icons'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost, getPosts } from '../../redux/actions/postActions'
import MyButton from '../common/button'
import LikePost from '../post/likePost'
import Comments from './comments'
import CreateComment from './createComment'
import { dialogStyles } from './styles'

const PostDialog = ({ postId, classes, post, getPost, getPosts }: any) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
    getPost(postId)
  }
  const handleClose = () => {
    setOpen(!open)
    getPosts()
  }

  return (
    <Fragment>
      <MyButton
        tip='Expand post'
        onClick={handleOpen}
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <Close />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {!post ? (
            <div className={classes.spinnerDiv}>
              <CircularProgress size={200} thickness={2} />
            </div>
          ) : (
            <Grid container spacing={10}>
              <Grid item sm={5}>
                <img
                  src={post.image}
                  alt='Profile'
                  className={classes.profileImage}
                />
              </Grid>
              <Grid item sm={7}>
                <Typography variant='h5' className={classes.title}>
                  {post.title}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant='body2' color='textSecondary'>
                  {dayjs(post.createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <Typography
                  variant='body2'
                  color='primary'
                  component={Link}
                  to={`/users/${post.user}`}
                >
                  @{post.name}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <LikePost postId={postId} likes={post.likes} />
                <span>{post.likes && post.likes.length} likes</span>
                <MyButton tip='comments'>
                  <Chat color='primary' />
                </MyButton>
                <span>{post.comments && post.comments.length} comments</span>
              </Grid>
              <Grid item sm={12}>
                <Typography variant='body1'>{post.body}</Typography>
              </Grid>
              <hr className={classes.visibleSeparator} />
              <CreateComment postId={postId} />
              <hr className={classes.visibleSeparator} />
              <Comments comments={post.comments} />
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

PostDialog.propTypes = {
  postId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  post: PropTypes.object,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = ({ post: { post } }: any) => ({
  post
})

const mapDispatchToProps = (dispatch: any) => ({
  getPost: (postId: string) => dispatch(getPost(postId)),
  getPosts: () => dispatch(getPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(dialogStyles)(PostDialog))
