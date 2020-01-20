import { AppBar, Button, Toolbar } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutStart } from '../../redux/actions/userActions'
import MyButton from '../common/button'
import CreatePost from '../post/createPost'

const Navbar = ({ isAuthenticated, signOutStart }: any) => (
  <AppBar>
    <Toolbar className='nav-container'>
      <Link to='/'>
        <MyButton tip='Home'>
          <Home />
        </MyButton>
      </Link>
      {isAuthenticated ? (
        <Fragment>
          <CreatePost />
          <Button color='inherit' component={Link} to='/posts'>
            Posts
          </Button>
          <Button
            color='inherit'
            component={Link}
            to='/'
            onClick={signOutStart}
          >
            Logout
          </Button>
        </Fragment>
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

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signOutStart: PropTypes.func.isRequired
}

const mapStateToProps = ({ user: { isAuthenticated } }: any) => ({
  isAuthenticated
})

const mapDispatchToProps = (dispatch: any) => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
