import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { ProtectedRoute } from '../components/Route'
import { MainLayout } from '../layouts/Main'
import { Content } from '../pages/Content'
import { Authors } from '../pages/Authors'

export const Routes = () => (
  <Switch>
    <Redirect from="/" to="/dashboard" exact />
    <ProtectedRoute component={Content} layout={MainLayout} path="/dashboard" exact />
    <ProtectedRoute component={Authors} layout={MainLayout} path="/dashboard/authors" exact />
  </Switch>
)
