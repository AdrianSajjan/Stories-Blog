import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BlogCard } from '../'

const useStyles = makeStyles((theme) => ({
  recentDiv: {
    marginTop: theme.spacing(4)
  },
  postsTitle: {
    fontFamily: 'Metal Mania',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: theme.spacing(1.5)
  }
}))

const RecentPosts = () => {
  const classes = useStyles()
  const recentPosts = useSelector((state) => state.posts.recent.posts)

  if (recentPosts.length === 0) return null

  return (
    <div className={classes.recentDiv}>
      <Typography variant="h5" className={classes.postsTitle}>
        Recent Posts
      </Typography>
      <Grid container spacing={2}>
        {recentPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4}>
            <BlogCard post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default RecentPosts
