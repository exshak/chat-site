import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import HomePage from './pages'
import PostsPage from './pages/posts'
import SignInPage from './pages/signin'
import SignUpPage from './pages/signup'
import { getCurrentUser } from './redux/actions/userActions'
import defaultTheme from './theme'

const theme = createMuiTheme(defaultTheme)

const token = localStorage.token
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

const App: React.FC = ({ getCurrentUser, currentUser }: any) => {
  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/posts' component={PostsPage} />
          <Route
            exact
            path='/signin'
            render={() => (currentUser ? <Redirect to='/' /> : <SignInPage />)}
          />
          <Route
            exact
            path='/signup'
            render={() => (currentUser ? <Redirect to='/' /> : <SignUpPage />)}
          />
        </Switch>
      </div>
    </MuiThemeProvider>
  )
}

const mapStateToProps = ({ user: { currentUser } }: any) => ({
  currentUser
})

const mapDispatchToProps = (dispatch: any) => ({
  getCurrentUser: () => dispatch(getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
