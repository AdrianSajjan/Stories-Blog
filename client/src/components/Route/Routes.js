import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectedRoute } from '.'
import { Main } from '..'
import { MainLayout } from '../../layouts'

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" hasLayout exact layout={MainLayout} component={Main} />
    </Switch>
  )
}

export default Routes
