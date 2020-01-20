import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core'
import {
  CalendarToday,
  Edit,
  KeyboardReturn,
  LocationOn
} from '@material-ui/icons'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentUser, signOutStart } from '../../redux/actions/userActions'
import { styles } from '../../utils/styles'
import MyButton from '../common/button'
import EditProfile from './editProfile'

const Profile = ({
  classes,
  currentUser,
  isAuthenticated,
  loading,
  getCurrentUser,
  signOutStart
}: any) => {
  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  // @ts-ignore
  const handleImage = () => document.getElementById('imageInput').click()
  const handleLogout = () => signOutStart()

  const { profile } = currentUser

  return loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : isAuthenticated && profile ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={profile.image} alt='profile' className='profile-image' />
          <input type='file' id='imageInput' hidden={true} />
          <MyButton
            tip='Edit picture'
            onClick={handleImage}
            btnClassName='button'
          >
            <Edit color='primary' />
          </MyButton>
        </div>
        <hr />
        <div className='profile-details'>
          <Typography
            variant='h6'
            color='primary'
            component={Link}
            to={`/users/${currentUser._id}`}
          >
            @{profile.name}
          </Typography>
          <hr />
          {profile.about && (
            <Typography variant='body2'>{profile.about}</Typography>
          )}
          <hr />
          {profile.location && (
            <Fragment>
              <LocationOn color='primary' /> <span>{profile.location}</span>
              <hr />
            </Fragment>
          )}
          <CalendarToday color='primary' />{' '}
          <span>Joined {dayjs(currentUser.createdAt).format('MMM YYYY')}</span>
        </div>
        <MyButton tip='Logout' onClick={handleLogout}>
          <KeyboardReturn color='primary' />
        </MyButton>
        <EditProfile />
      </div>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant='body2' align='center'>
        No profile found, please login
      </Typography>
      <div className={classes.buttons}>
        <Button variant='contained' color='primary' href='/signin'>
          Sign in
        </Button>
        <Button variant='contained' color='secondary' href='/signup'>
          Sign up
        </Button>
      </div>
    </Paper>
  )
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  signOutStart: PropTypes.func.isRequired
}

const mapStateToProps = ({
  user: { currentUser, isAuthenticated, loading }
}: any) => ({
  currentUser,
  isAuthenticated,
  loading
})

const mapDispatchToProps = (dispatch: any) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  signOutStart: () => dispatch(signOutStart())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile))
