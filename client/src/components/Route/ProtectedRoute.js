import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const { component: Component, layout: Layout, hasLayout, isPrivate, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props) =>
        isPrivate ? (
          <Redirect to="/" />
        ) : hasLayout ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

ProtectedRoute.defaultProps = {
  hasLayout: false,
  isPrivate: false
}

export default ProtectedRoute
