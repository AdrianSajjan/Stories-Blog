import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectedRoute } from '.'
import { Main } from '../../pages'
import { MainLayout } from '../../layouts'

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" layout={MainLayout} component={Main} hasLayout exact />
      <ProtectedRoute path="/category/:category" layout={MainLayout} component={Main} hasLayout exact />
    </Switch>
  )
}

export default Routes
