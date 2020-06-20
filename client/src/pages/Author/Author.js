import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  createPostTitle: {
    fontFamily: 'Metal Mania',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const Author = () => {
  const isAuthor = useSelector((state) => state.user.isAuthor)
  const isLoading = useSelector((state) => state.user.loading)
  const classes = useStyles()

  if (!isAuthor) return isLoading ? null : <Redirect to="/" />

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Container>
  )
}

export default Author
