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
import { signInStart } from '../../redux/actions/userActions'
import { styles } from '../../utils/styles'

const Signin = ({ classes, loading, signInStart }: any) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event: any) => {
    setCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    signInStart(userCredentials)
  }

  const { email, password } = userCredentials

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={logo} alt='logo' className={classes.image} />
        <Typography variant='h6' className={classes.pageTitle}>
          Sign in with your email and password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name='email'
            type='email'
            label='Email'
            value={email}
            onChange={handleChange}
            className={classes.textField}
            fullWidth
            required
          />
          <TextField
            name='password'
            type='password'
            label='Password'
            value={password}
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
            Sign in
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to='/signup'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
  signInStart: PropTypes.func.isRequired
}

const mapStateToProps = ({ user: { loading } }: any) => ({
  loading
})

const mapDispatchToProps = (dispatch: any) => ({
  signInStart: (userCredentials: object) =>
    dispatch(signInStart(userCredentials))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Signin))
