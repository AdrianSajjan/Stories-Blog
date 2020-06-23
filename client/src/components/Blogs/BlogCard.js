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
  chipCategory: {
    paddingLeft: 5,
    paddingRight: 5
  },
  postTitle: {
    marginTop: theme.spacing(2)
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
    return moment(post.createdAt).fromNow()
  }

  return (
    <Card>
      <CardActionArea component={RouterLink} to="/@adrian/post/post-slug">
        <CardMedia className={classes.cardMedia} image={getCoverImage()} title="Random Image" />
        <CardContent>
          <Chip label={post.category} color="primary" size="small" className={classes.chipCategory} />
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
