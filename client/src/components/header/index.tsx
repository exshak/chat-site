import { AppBar, Button, Toolbar } from '@material-ui/core'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutStart } from '../../redux/actions/userActions'

const Header = ({ currentUser, signOutStart }: any) => {
  return (
    <AppBar>
      <Toolbar className=''>
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>
        {currentUser ? (
          <Button color='inherit' component={Link} to='' onClick={signOutStart}>
            Logout
          </Button>
        ) : (
          <Fragment>
            <Button color='inherit' component={Link} to='/signin'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/signup'>
              Register
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({ user: { currentUser } }: any) => ({
  currentUser
})

const mapDispatchToProps = (dispatch: any) => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
