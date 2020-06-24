import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardActionArea, CardContent, Typography, Grid, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  postBanner: {
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(3)
    }
  },
  actionArea: (prop) => ({
    padding: [`${theme.spacing(1)}px`, '0'].join(' '),
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${prop.imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative'
  }),
  cardContent: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 300,
    position: 'relative'
  },
  chipCategory: {
    position: 'absolute',
    backgroundColor: '#f06292',
    paddingLeft: 5,
    paddingRight: 5,
    top: 5,
    left: 5
  },
  postGrid: {
    height: '100%'
  },
  postItem: {
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  postTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
  postSubtitle: {
    color: '#ffffff',
    marginBottom: theme.spacing(3)
  }
}))

const FeaturedBlog = () => {
  const postLength = useSelector((state) => state.posts.all.posts.length)

  const featuredPost = useSelector(
    (state) => state.posts.all.posts[Math.floor(Math.random() * state.posts.all.posts.length)]
  )

  const classes = useStyles({
    imageUrl: (featuredPost && featuredPost.coverImage) || 'https://source.unsplash.com/random'
  })

  if (postLength === 0) return null

  return (
    <Fragment>
      <Card className={classes.postBanner}>
        <CardActionArea className={classes.actionArea}>
          <CardContent className={classes.cardContent}>
            <Chip label={featuredPost.category} className={classes.chipCategory} size="small" color="primary" />
            <Grid container className={classes.postGrid}>
              <Grid item xs={12} sm={10} className={classes.postItem}>
                <Typography variant="h5" align="center" className={classes.postTitle}>
                  {featuredPost.title}
                </Typography>
                <Typography align="center" className={classes.postSubtitle}>
                  {featuredPost.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fragment>
  )
}

export default FeaturedBlog
