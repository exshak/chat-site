import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  withStyles
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from '../../redux/actions/userActions'
import MyButton from '../common/button'
import { editStyles } from './styles'

const EditProfile = ({
  classes,
  currentUser: { profile },
  updateProfile
}: any) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
    setUserProfile({
      name: profile.name ? profile.name : '',
      about: profile.about ? profile.about : '',
      location: profile.location ? profile.location : ''
    })
  }

  const handleClose = () => setOpen(!open)

  const [userProfile, setUserProfile] = useState({
    name: '',
    about: '',
    location: ''
  })

  const handleChange = (event: any) =>
    setUserProfile({ ...userProfile, [event.target.name]: event.target.value })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    updateProfile({
      name: userProfile.name,
      about: userProfile.about,
      location: userProfile.location
    })
    handleClose()
  }

  return (
    <Fragment>
      <MyButton
        tip='Edit Profile'
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <Edit color='primary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Edit your profile</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='name'
              type='text'
              label='Name'
              placeholder='Your name'
              value={userProfile.name}
              onChange={handleChange}
              className={classes.textField}
              fullWidth
            />
            <TextField
              name='about'
              type='text'
              label='About'
              placeholder='About you'
              value={userProfile.about}
              onChange={handleChange}
              className={classes.textField}
              fullWidth
            />
            <TextField
              name='location'
              type='text'
              label='Location'
              placeholder='Your location'
              value={userProfile.location}
              onChange={handleChange}
              className={classes.textField}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
}

const mapToProps = ({ user: { currentUser } }: any) => ({
  currentUser
})

const mapDispatchToProps = (dispatch: any) => ({
  updateProfile: (profile: object) => dispatch(updateProfile(profile))
})

export default connect(
  mapToProps,
  mapDispatchToProps
)(withStyles(editStyles)(EditProfile))
