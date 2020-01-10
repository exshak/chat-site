import { Button, TextField, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signInStart } from '../../redux/actions/userActions'

const styles = (theme: any) => ({
  ...theme.spreadStyle
})

const SignIn = ({ signInStart }: any) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const { email, password } = userCredentials

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    signInStart(email, password)
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target

    setCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <TextField
          name='email'
          type='email'
          label='Email'
          value={email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name='password'
          type='password'
          label='Password'
          value={password}
          onChange={handleChange}
          fullWidth
          required
        />
        <div className='buttons'>
          <Button color='primary' type='submit' variant='contained'>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  signInStart: (email: any, password: any) =>
    dispatch(signInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignIn))
