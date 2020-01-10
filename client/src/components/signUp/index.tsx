import { Button, TextField, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signUpStart } from '../../redux/actions/userActions'

const styles = (theme: any) => ({
  ...theme.spreadStyle
})

const SignUp = ({ signUpStart }: any) => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { name, email, password, confirmPassword } = userCredentials

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return
    }

    signUpStart({ name, email, password })
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have a account</h2>
      <span>Sign up with your email and password</span>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <TextField
          type='text'
          name='name'
          label='Name'
          value={name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          type='email'
          name='email'
          label='Email'
          value={email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          type='password'
          name='password'
          label='Password'
          value={password}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          type='password'
          name='confirmPassword'
          label='Confirm Password'
          value={confirmPassword}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button color='primary' type='submit' variant='contained'>
          SIGN UP
        </Button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  signUpStart: (userCredentials: any) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignUp))
