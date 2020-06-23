import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Routes, Notifier } from './components'
import { getCategoryPosts, getSelfPosts } from './actions'
import { categoryLoader } from './constants'

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh'
  },
  [theme.breakpoints.up('sm')]: {
    container: {
      borderLeft: ['1px', 'solid', theme.palette.divider].join(' '),
      borderRight: ['1px', 'solid', theme.palette.divider].join(' ')
    }
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      borderLeft: 'none',
      borderRight: 'none'
    }
  }
}))

export const App = () => {
  const classes = useStyles()
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
    <Container maxWidth="md" className={classes.container} disableGutters>
      <Notifier />
      <Routes />
    </Container>
  )
}
