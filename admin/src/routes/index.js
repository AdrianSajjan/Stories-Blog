import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { ProtectedRoute } from '../components/Route'
import { MainLayout } from '../layouts/Main'
import { Content } from '../pages/Content'

export const Routes = () => (
  <Switch>
    <Redirect from="/" to="/dashboard" exact />
    <ProtectedRoute component={Content} layout={MainLayout} path="/dashboard" />
  </Switch>
)
