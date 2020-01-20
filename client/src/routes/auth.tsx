import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute: React.FC = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      isAuthenticated && !loading ? (
        <Redirect to='/posts' />
      ) : (
        <Component {...props} />
      )
    }
  />
)

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = ({ user: { isAuthenticated, loading } }: any) => ({
  isAuthenticated,
  loading
})

export default connect(mapStateToProps, null)(AuthRoute)
