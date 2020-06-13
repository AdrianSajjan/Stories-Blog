import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BlogCard } from '../'

const useStyles = makeStyles((theme) => ({
  postsTitle: {
    fontFamily: 'Metal Mania',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: theme.spacing(1.5)
  }
}))

const RecentPosts = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <Typography variant="h5" className={classes.postsTitle}>
        Recent Posts
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <BlogCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BlogCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BlogCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BlogCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BlogCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BlogCard />
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default RecentPosts
