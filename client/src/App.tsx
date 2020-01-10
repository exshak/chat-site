import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import HomePage from './pages'
import SignInPage from './pages/signin'
import SignUpPage from './pages/signup'
import { getCurrentUser } from './redux/actions/userActions'
import store from './redux/store'
import defaultTheme from './theme'

const theme = createMuiTheme(defaultTheme)

const token = localStorage.token
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(getCurrentUser())
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signin' component={SignInPage} />
          <Route exact path='/signup' component={SignUpPage} />
        </Switch>
      </div>
    </MuiThemeProvider>
  )
}

export default App
