import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Chip } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { blankProfile } from '../../constants'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: 200
  },
  chipDiv: {
    display: 'flex',
    flexWrap: true
  },
  chipCategory: {
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  chipPremium: {
    marginBottom: theme.spacing(1),
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#f06292',
    color: '#fff'
  },
  postTitle: {
    marginTop: theme.spacing(1)
  },
  postSubtitle: {
    color: theme.palette.grey[700]
  },
  authorDiv: {
    marginTop: theme.spacing(3),
    display: 'flex'
  },
  authorProfileImg: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '50%'
  },
  authorInfo: {
    marginLeft: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  postDate: {
    color: theme.palette.grey[600]
  }
}))

const BlogCard = (props) => {
  const { post } = props
  const classes = useStyles()

  const getCoverImage = () => {
    return post.coverImage && post.coverImage !== '' ? post.coverImage : 'https://source.unsplash.com/random'
  }

  const getProfileImage = () => {
    return post.user.profileImage && post.user.profileImage !== '' ? post.user.profileImage : blankProfile
  }

  const getPostDate = () => {
    const timeFromNow = moment(post.createdAt).fromNow()
    return timeFromNow.startsWith('a') ? `A${timeFromNow.substring(1)}` : timeFromNow
  }

  const getPostURL = () => {
    return `/@${post.author}/${post.slug}`
  }

  return (
    <Card>
      <CardActionArea component={RouterLink} to={getPostURL()}>
        <CardMedia className={classes.cardMedia} image={getCoverImage()} title="Random Image" />
        <CardContent>
          <div className="chapDiv">
            <Chip label={post.category} color="primary" size="small" className={classes.chipCategory} />
            {post.premium && <Chip label="Premium" size="small" className={classes.chipPremium} />}
          </div>
          <Typography className={classes.postTitle} gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" className={classes.postSubtitle}>
            {post.description}
          </Typography>
          <div className={classes.authorDiv}>
            <img src={getProfileImage()} alt="Profile" className={classes.authorProfileImg} />
            <div className={classes.authorInfo}>
              <Typography variant="subtitle2">{post.author}</Typography>
              <Typography variant="caption" className={classes.postDate}>
                {getPostDate()}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default BlogCard
