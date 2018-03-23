import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import NotFound from '../notFound'
import Loading from '../loading'

const ProtectedRoute = props => {
  const { component: Component, loading, signedIn, ...rest } = props

  return (
    <Route
      {...rest}
      render={p =>
        // eslint-disable-next-line
        loading ? <Loading /> : signedIn ? <Component {...p} /> : <NotFound />
      }
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired
}

export default ProtectedRoute
