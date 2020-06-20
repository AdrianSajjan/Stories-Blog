import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const { component: Component, layout: Layout, isPrivate, ...rest } = props
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const isLoading = useSelector((state) => state.user.loading)

  return (
    <Route
      {...rest}
      render={(props) =>
        isPrivate ? (
          isAuthenticated ? (
            Layout !== null ? (
              <Layout>
                <Component {...props} />
              </Layout>
            ) : (
              <Component {...props} />
            )
          ) : isLoading ? null : (
            <Redirect to="/" />
          )
        ) : Layout !== null ? (
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
  isPrivate: false
}

export default ProtectedRoute
