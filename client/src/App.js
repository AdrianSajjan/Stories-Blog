import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Notifier } from './components'
import { Routes } from './routes'
import { getCategoryPosts, getSelfPosts } from './actions'
import { categoryLoader } from './constants'

export const App = () => {
  const userLoading = useSelector((state) => state.user.loading)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const isAuthor = useSelector((state) => state.user.isAuthor)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userLoading) {
      categoryLoader.map((category) => dispatch(getCategoryPosts(category.name, category.key)))
    }
  }, [userLoading, dispatch])

  useEffect(() => {
    if (isAuthenticated && isAuthor) dispatch(getSelfPosts())
  }, [isAuthenticated, isAuthor, dispatch])

  return (
    <>
      <Notifier />
      <Routes />
    </>
  )
}
