import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BlogCard } from '../'
import { categoryLoader } from '../../constants/'

const useStyles = makeStyles((theme) => ({
  categoryDiv: {
    marginTop: theme.spacing(4)
  },
  postsTitle: {
    fontFamily: 'Metal Mania',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: theme.spacing(1.5)
  }
}))

const CategoryPosts = () => {
  const classes = useStyles()
  const categoryPosts = useSelector((state) => {
    const categoryEntries = Object.entries(state.posts)
    return categoryEntries.filter((entry) => categoryLoader.some((category) => category.key === entry[0]))
  })

  const getNameFromKey = (key) =>
    categoryLoader
      .filter((category) => category.key === key)
      .splice(-1)
      .pop().name

  return (
    <Fragment>
      {categoryPosts.map((category) =>
        category[1].posts.length > 0 ? (
          <div key={category[0]} className={classes.categoryDiv}>
            <Typography variant="h5" className={classes.postsTitle}>
              {getNameFromKey(category[0])}
            </Typography>
            <Grid container spacing={2} className={classes.gridContainer}>
              {category[1].posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={4}>
                  <BlogCard post={post} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null
      )}
    </Fragment>
  )
}

export default CategoryPosts
