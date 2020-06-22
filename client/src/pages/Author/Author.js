import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MarkdownCard } from '../../components'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3)
  }
}))

const Author = () => {
  const isAuthor = useSelector((state) => state.user.isAuthor)
  const isLoading = useSelector((state) => state.user.loading)
  const classes = useStyles()

  if (!isAuthor) return isLoading ? null : <Redirect to="/" />

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MarkdownCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Author
