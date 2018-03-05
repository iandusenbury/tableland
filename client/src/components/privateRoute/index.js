import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import NotFound from '../notFound'
import Loading from '../loading'

const PrivateRoute = props => {
  const { component: Component, loading, isAdmin, ...rest } = props

  const componentToRender = () => {
    if (loading) {
      return <Loading />
    }

    return <NotFound />
  }

  return (
    <Route
      {...rest}
      render={p =>
        loading ? (
          <Loading />
        ) : (
        isAdmin ? <Component {...p} /> : <NotFound />)}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default PrivateRoute
