import { Button, Grid, TextField, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../redux/actions/postActions'
import { styles } from '../../utils/styles'

const CreateComment = ({
  postId,
  classes,
  isAuthenticated,
  addComment
}: any) => {
  const [comment, setComment] = useState('')

  const handleChange = (event: any) => setComment(event.target.value)
  const handleSubmit = (event: any) => {
    event.preventDefault()
    addComment(postId, { body: comment })
    setComment('')
  }

  return (
    isAuthenticated && (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name='body'
            type='text'
            label='Comment on post'
            value={comment}
            onChange={handleChange}
            className={classes.textField}
            fullWidth
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Grid>
    )
  )
}

CreateComment.propTypes = {
  postId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  addComment: PropTypes.func.isRequired
}

const mapStateToProps = ({ user: { isAuthenticated } }: any) => ({
  isAuthenticated
})

const mapDispatchToProps = (dispatch: any) => ({
  addComment: (postId: string, comment: object) =>
    dispatch(addComment(postId, comment))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateComment))
