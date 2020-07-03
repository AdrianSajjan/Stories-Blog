import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectedRoute } from '../components'
import { Main, Author, BecomeAnAuthor, CreatePost, EditPost, Post, Error404 } from '../pages'
import { MainLayout } from '../layouts'

export const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" layout={MainLayout} component={Main} exact />
      <ProtectedRoute path="/category/:category" layout={MainLayout} component={Main} exact />
      <ProtectedRoute path="/author" layout={MainLayout} component={Author} isPrivate exact />
      <ProtectedRoute path="/become-an-author" layout={MainLayout} component={BecomeAnAuthor} isPrivate exact />
      <ProtectedRoute path="/author/create" layout={MainLayout} component={CreatePost} isPrivate exact />
      <ProtectedRoute path="/author/edit/:slug" layout={MainLayout} component={EditPost} isPrivate exact />
      <ProtectedRoute path="/:author/:slug" layout={MainLayout} component={Post} exact />
      <ProtectedRoute layout={MainLayout} component={Error404} />
    </Switch>
  )
}
