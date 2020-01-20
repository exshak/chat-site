import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  withStyles
} from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../redux/actions/postActions'
import MyButton from '../common/button'
import { createStyles } from './styles'

const CreatePost = ({ classes, loading, createPost }: any) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)
  const handleClose = () => setOpen(!open)

  const [post, setPost] = useState({
    title: '',
    body: ''
  })

  const handleChange = (event: any) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    createPost(post)
    setPost({
      title: '',
      body: ''
    })
    handleClose()
  }

  const { title, body } = post

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip='New Post'>
        <Add />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <Close />
        </MyButton>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='title'
              type='text'
              label='Title'
              placeholder='Title'
              value={title}
              onChange={handleChange}
              className={classes.textField}
              fullWidth
            />
            <TextField
              name='body'
              type='text'
              label='Body'
              placeholder='Text'
              multiline
              rows='3'
              value={body}
              onChange={handleChange}
              className={classes.textField}
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

CreatePost.propTypes = {
  classes: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
}

const mapStateToProps = ({ post: { loading } }: any) => ({
  loading
})

const mapDispatchToProps = (dispatch: any) => ({
  createPost: (post: object) => dispatch(createPost(post))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(createStyles)(CreatePost))
