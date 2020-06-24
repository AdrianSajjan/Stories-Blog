import React, { Fragment } from 'react'
import moment from 'moment'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, CardActionArea, CardContent, Typography, Grid, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { blankProfile } from '../../constants'

const useStyles = makeStyles((theme) => ({
  postBanner: {
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(3)
    }
  },
  actionArea: (prop) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${prop.imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative'
  }),
  cardContent: {
    padding: theme.spacing(1.5)
  },
  categoryDiv: {
    height: 50,
    marginBottom: theme.spacing(2)
  },
  chipCategory: {
    backgroundColor: '#f06292',
    paddingLeft: 5,
    paddingRight: 5
  },
  authorDiv: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    height: 50,
    marginTop: theme.spacing(2),
    paddingBottom: 5,
    paddingRight: 5
  },
  authorProfileImg: {
    width: 45,
    height: 45,
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '50%'
  },
  authorInfo: {
    marginRight: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#fff'
  },
  postItem: {
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

  const getProfileImage = () => {
    return featuredPost.user.profileImage && featuredPost.user.profileImage !== ''
      ? featuredPost.user.profileImage
      : blankProfile
  }

  const getPostDate = () => {
    const timeFromNow = moment(featuredPost.createdAt).fromNow()
    return timeFromNow.startsWith('a') ? `A${timeFromNow.substring(1)}` : timeFromNow
  }

  const getPostURL = () => {
    return `/@${featuredPost.author}/${featuredPost.slug}`
  }

  if (postLength === 0) return null

  return (
    <Fragment>
      <Card className={classes.postBanner}>
        <CardActionArea className={classes.actionArea} component={RouterLink} to={getPostURL()}>
          <CardContent className={classes.cardContent}>
            <div className={classes.categoryDiv}>
              <Chip label={featuredPost.category} className={classes.chipCategory} size="small" color="primary" />
            </div>
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
            <div className={classes.authorDiv}>
              <img src={getProfileImage()} alt="Profile" className={classes.authorProfileImg} />
              <div className={classes.authorInfo}>
                <Typography variant="subtitle2" color="inherit">
                  {featuredPost.author}
                </Typography>
                <Typography variant="caption" color="inherit" align="right">
                  {getPostDate()}
                </Typography>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fragment>
  )
}

export default FeaturedBlog
