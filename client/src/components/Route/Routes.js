import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectedRoute } from '.'
import { Main, Author } from '../../pages'
import { MainLayout } from '../../layouts'

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" layout={MainLayout} component={Main} exact />
      <ProtectedRoute path="/author" layout={MainLayout} component={Author} isPrivate exact />
      <ProtectedRoute path="/category/:category" layout={MainLayout} component={Main} exact />
    </Switch>
  )
}

export default Routes
