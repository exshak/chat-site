import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  withStyles
} from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../../redux/actions/postActions'
import MyButton from '../common/button'
import { deleteStyles } from './styles'

const DeletePost = ({ postId, classes, deletePost }: any) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)
  const handleClose = () => setOpen(!open)
  const handleDelete = () => {
    setOpen(!open)
    deletePost(postId)
  }

  return (
    <Fragment>
      <MyButton
        tip='Delete Post'
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color='secondary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

DeletePost.propTypes = {
  postId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch: any) => ({
  deletePost: (postId: string) => dispatch(deletePost(postId))
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(deleteStyles)(DeletePost))
