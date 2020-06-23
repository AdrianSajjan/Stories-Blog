import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Grid, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MarkdownCard } from '../../components'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3)
  },
  authorPosts: {
    marginTop: theme.spacing(4)
  },
  authorTitle: {
    fontFamily: 'Metal Mania'
  }
}))

const Author = () => {
  const isAuthor = useSelector((state) => state.user.isAuthor)
  const isLoading = useSelector((state) => state.user.loading)
  //const { posts, loading } = useSelector((state) => state.posts.self)
  const classes = useStyles()

  if (!isAuthor) return isLoading ? null : <Redirect to="/" />

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MarkdownCard />
        </Grid>
      </Grid>
      <div className={classes.authorPosts}>
        <Typography className={classes.authorTitle} variant="h5" align="center">
          Your Posts
        </Typography>
      </div>
    </Container>
  )
}

export default Author
