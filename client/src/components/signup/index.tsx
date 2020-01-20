import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import { signUpStart } from '../../redux/actions/userActions'
import { styles } from '../../utils/styles'

const Signup = ({ classes, loading, signUpStart }: any) => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (event: any) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return
    }

    signUpStart(userCredentials)
  }

  const { name, email, password, confirmPassword } = userCredentials

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={logo} alt='logo' className={classes.image} />
        <Typography variant='h6' className={classes.pageTitle}>
          Signup with your email and password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type='text'
            name='name'
            label='Name'
            value={name}
            onChange={handleChange}
            className={classes.textField}
            fullWidth
            required
          />
          <TextField
            type='email'
            name='email'
            label='Email'
            value={email}
            onChange={handleChange}
            className={classes.textField}
            fullWidth
            required
          />
          <TextField
            type='password'
            name='password'
            label='Password'
            value={password}
            onChange={handleChange}
            className={classes.textField}
            fullWidth
            required
          />
          <TextField
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            value={confirmPassword}
            onChange={handleChange}
            className={classes.textField}
            fullWidth
            required
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Sign up
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Sign in <Link to='/login'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signUpStart: PropTypes.func.isRequired
}

const mapStateToProps = ({ user: { loading } }: any) => ({
  loading
})

const mapDispatchToProps = (dispatch: any) => ({
  signUpStart: (userCredentials: object) =>
    dispatch(signUpStart(userCredentials))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Signup))
