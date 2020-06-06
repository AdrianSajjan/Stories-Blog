import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RouteWithLayout = (props) => {
  const { component: Component, layout: Layout, isPrivate, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props) =>
        isPrivate ? (
          <Redirect to="/" />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  )
}

export default RouteWithLayout
