import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import HomePage from './pages'
import PostsPage from './pages/posts'
import SignInPage from './pages/signin'
import SignUpPage from './pages/signup'
import { getCurrentUser } from './redux/actions/userActions'
import AuthRoute from './routes/auth'
import muiTheme from './theme'

const theme = createMuiTheme(muiTheme)

const token = localStorage.token
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

const App: React.FC = ({ getCurrentUser }: any) => {
  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  return (
    <div className='App'>
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/posts' component={PostsPage} />
          // @ts-ignore
          <AuthRoute exact path='/signin' component={SignInPage} />
          // @ts-ignore
          <AuthRoute exact path='/signup' component={SignUpPage} />
        </Switch>
      </MuiThemeProvider>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  getCurrentUser: () => dispatch(getCurrentUser())
})

export default connect(null, mapDispatchToProps)(App)
