import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Grid, Typography, IconButton, Button } from '@material-ui/core'
import { ThumbUp, ThumbDown } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { getPostBySlug } from '../../actions'
import { blankProfile } from '../../constants'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4)
  },
  gridItem: {
    [theme.breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    fontWeight: 'bold'
  },
  authorDiv: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  authorInfo: {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  authorProfileImg: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '50%'
  },
  postAuthor: {
    marginLeft: theme.spacing(2)
  },
  postDate: {
    color: theme.palette.grey[600]
  },
  html: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  premiumDiv: {
    marginTop: theme.spacing(3),
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  premiumText: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold'
  },
  voteDiv: {
    display: 'flex',
    flexWrap: true,
    alignItems: 'center'
  },
  thumbUpDiv: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  thumbDownDiv: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  }
}))

const Post = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { slug } = useParams()
  const [init, setInit] = useState(false)
  let { post, loading } = useSelector((state) => {
    let post = state.posts.all.posts
      .filter((post) => post.slug === slug)
      .slice(-1)
      .shift()

    if (post) return { post, loading: false }
    else return state.posts.current
  })

  useEffect(() => {
    if (!post && !init) {
      dispatch(getPostBySlug(slug))
      setInit(true)
    }
  }, [post, init, dispatch, slug])

  const getHTMLContent = () => {
    return post.html
      .replace(/background-color:#ffffff/gi, 'background-color:transparent')
      .replace(/font-size:14px/gi, 'font-size: 16px')
      .replace(/open sans/gi, "'Poppins'")
  }

  const getProfileImage = () => {
    return post.user.profileImage && post.user.profileImage !== '' ? post.user.profileImage : blankProfile
  }

  const getPostDate = () => {
    const timeFromNow = moment(post.createdAt).fromNow()
    return timeFromNow.startsWith('a') ? `A${timeFromNow.substring(1)}` : timeFromNow
  }

  if (!post) return loading ? <h1>Loading...</h1> : <h1>Not Found</h1>

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item className={classes.gridItem} xs={12}>
          <Typography variant="h5" align="center" className={classes.title}>
            {post.title}
          </Typography>
          <div className={classes.authorDiv}>
            <div className={classes.authorInfo}>
              <img src={getProfileImage()} alt="Profile" className={classes.authorProfileImg} />
              <Typography variant="subtitle1" className={classes.postAuthor}>
                {post.author}
              </Typography>
            </div>
            <Typography variant="subtitle2" className={classes.postDate}>
              {getPostDate()}
            </Typography>
          </div>
          {!post.premium ? (
            <Fragment>
              <div className={classes.html}>{ReactHtmlParser(getHTMLContent())}</div>
              <div className={classes.voteDiv}>
                <div className={classes.thumbUpDiv}>
                  <IconButton>
                    <ThumbUp />
                  </IconButton>
                  <Typography variant="subtitle2">{post.upvote || 0}</Typography>
                </div>
                <div className={classes.thumbDownDiv}>
                  <IconButton>
                    <ThumbDown />
                  </IconButton>
                  <Typography variant="subtitle2">{post.downvote || 0}</Typography>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className={classes.premiumDiv}>
              <Typography variant="body1" className={classes.premiumText} align="center">
                This post is marked as premium. Please create an account to see this post.
              </Typography>
              <Button variant="contained" color="primary">
                <Typography variant="button">Sign In or Create an Account</Typography>
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Post
