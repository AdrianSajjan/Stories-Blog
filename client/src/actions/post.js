import axios from 'axios'
import { enqueueSnackbar } from './'
import {
  GET_CATEGORY_POSTS,
  SET_CATEGORY_POSTS,
  GET_AUTHOR_POSTS,
  SET_AUTHOR_POSTS,
  GET_SELF_POSTS,
  SET_SELF_POSTS,
  GET_CURRENT_POST,
  SET_CURRENT_POST
} from '../constants'

export const getRecentPosts = () => async (dispatch, getState) => {
  const recentPosts = getState().posts.recent.posts
  const lastPost = recentPosts.slice(-1).pop()
  const lastID = lastPost ? lastPost._id : ''
  dispatch({ type: GET_CATEGORY_POSTS, key: 'recent' })

  try {
    const res = await axios.get(`/api/post/recent?last=${lastID}`)
    dispatch({ type: SET_CATEGORY_POSTS, key: 'recent', value: res.data.posts })
  } catch (err) {
    dispatch({ type: SET_CATEGORY_POSTS, key: 'recent', value: [] })
  }
}

export const getCategoryPosts = (category, key) => async (dispatch, getState) => {
  const categoryPosts = getState().posts[key].posts
  const lastPost = categoryPosts.slice(-1).pop()
  const lastID = lastPost ? lastPost._id : ''
  dispatch({ type: GET_CATEGORY_POSTS, key })

  try {
    const res = await axios.get(`/api/post/category/${category}?last=${lastID}`)
    dispatch({ type: SET_CATEGORY_POSTS, key, value: res.data.posts })
  } catch (err) {
    dispatch({ type: SET_CATEGORY_POSTS, key, value: [] })
  }
}

export const getAuthorPosts = (author) => async (dispatch, getState) => {
  const authorPosts = getState().posts.author.posts
  const lastPost = authorPosts.slice(-1).pop()
  const lastID = lastPost ? lastPost._id : ''
  dispatch({ type: GET_AUTHOR_POSTS })

  try {
    const res = await axios.get(`/api/post/author/${author}?last=${lastID}`)
    dispatch({ type: SET_AUTHOR_POSTS, value: { name: author, posts: res.data.posts } })
  } catch (err) {
    dispatch({ type: SET_AUTHOR_POSTS, value: { name: '', posts: [] } })
  }
}

export const getSelfPosts = () => async (dispatch) => {
  dispatch({ type: GET_SELF_POSTS })

  try {
    const res = await axios.get('/api/post/')
    dispatch({ type: SET_SELF_POSTS, value: res.data.posts })
  } catch (err) {
    dispatch({ type: SET_SELF_POSTS, value: [] })
  }
}

export const createPost = (values) => async (dispatch) => {
  try {
    const res = await axios.post('/api/post', values)
    dispatch({ type: SET_SELF_POSTS, value: res.data.post })
    dispatch(enqueueSnackbar({ message: 'Post has been create successfully', options: { variant: 'success' } }))
  } catch (err) {
    dispatch(enqueueSnackbar({ message: "Couldn't create post", options: { variant: 'error' } }))
  }
}

export const editPost = (values) => async (dispatch) => {
  try {
    const res = await axios.put('/api/post', values)
    dispatch({ type: SET_SELF_POSTS, value: res.data.post })
    dispatch(enqueueSnackbar({ message: 'Post has been create successfully', options: { variant: 'success' } }))
  } catch (err) {
    dispatch(enqueueSnackbar({ message: "Couldn't create post", options: { variant: 'error' } }))
  }
}

export const getPostBySlug = (slug) => async (dispatch) => {
  dispatch({ type: GET_CURRENT_POST })

  try {
    const res = await axios.get(`/api/post/${slug}`)
    dispatch({ type: SET_CURRENT_POST, value: res.data.post })
  } catch (err) {
    dispatch({ type: SET_CURRENT_POST, value: null })
    dispatch(enqueueSnackbar({ message: 'Post not found', options: { variant: 'error' } }))
  }
}
