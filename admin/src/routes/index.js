import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { ProtectedRoute } from '../components/Route'
import { MainLayout } from '../layouts/Main'
import { Authors } from '../pages/Authors'
import { PendingRequest } from '../pages/Pending'
import { ComingSoon } from '../pages/Coming-Soon'

export const Routes = () => (
  <Switch>
    <Redirect from="/" to="/dashboard" exact />
    <ProtectedRoute component={ComingSoon} layout={MainLayout} path="/dashboard" exact />
    <ProtectedRoute component={Authors} layout={MainLayout} path="/dashboard/authors" exact />
    <ProtectedRoute component={PendingRequest} layout={MainLayout} path="/dashboard/pending-requests" exact />
    <ProtectedRoute component={ComingSoon} layout={MainLayout} path="/dashboard/mailbox" exact />
    <ProtectedRoute component={ComingSoon} layout={MainLayout} path="/dashboard/users/search" exact />
  </Switch>
)
