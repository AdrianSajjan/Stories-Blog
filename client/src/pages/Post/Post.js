import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Grid, Typography } from '@material-ui/core'
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
    marginTop: theme.spacing(3)
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
          <div className={classes.html}>{ReactHtmlParser(getHTMLContent())}</div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Post
