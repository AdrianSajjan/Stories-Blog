const express = require('express')
const { ObjectId } = require('mongoose').Types
const { Post, User } = require('../../models')
const { validatePost, sanitizeHtml } = require('../../utils')
const { authorizeProtectedRoute, authorizePrivateRoute, validateRequest } = require('../../middleware')

const router = express.Router()

/**
 * @route : /api/post
 * @type : GET
 * @access : Protected
 * @desc : Return all Posts
 */
router.get('/', authorizeProtectedRoute, async (req, res) => {
  try {
    const hasAccount = req.account
    const posts = {
      freePosts: [],
      premiumPosts: []
    }

    posts.freePosts = await Post.find({ premium: false })
    if (hasAccount) posts.premiumPosts = await Post.find({ premium: true })

    res.json({ posts })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Something went wrong. Please try again.')
  }
})

/**
 * @route : /api/post/:slug
 * @type : GET
 * @access : Protected
 * @desc : Return A Post by Slug
 */
router.get('/:slug', authorizeProtectedRoute, async (req, res) => {
  try {
    const { slug } = req.params
    const hasAccount = req.account

    const post = await Post.find({ slug: slug })

    if (post.premium && hasAccount) res.json({ post })
    else res.status(403).json({ msg: 'Create an account to view this post.' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Something went wrong. Please try again.')
  }
})

/**
 * @route : /api/post/category/:category
 * @type : GET
 * @access : Protected
 * @desc : Return all Posts by category
 */
router.get('/category/:category', authorizeProtectedRoute, async (req, res) => {
  try {
    const { category } = req.params
    const hasAccount = req.account
    const posts = {
      freePosts: [],
      premiumPosts: []
    }

    posts.freePosts = await Post.find({
      $and: [{ premium: false }, { category: category }]
    }).populate('user', ['profileImage'])

    if (hasAccount)
      posts.premiumPosts = await Post.find({
        $and: [{ premium: true }, { category: category }]
      }).populate('user', ['profileImage'])

    res.json({ posts })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Something went wrong. Please try again.')
  }
})

/**
 * @route : /api/post/author/:author
 * @type : GET
 * @access : Protected
 * @desc : Return all Posts by author
 */
router.get('/author/:author', authorizeProtectedRoute, async (req, res) => {
  try {
    const { author } = req.params
    const hasAccount = req.account
    const posts = {
      freePosts: [],
      premiumPosts: []
    }

    posts.freePosts = await Post.find({
      $and: [{ premium: false }, { author: author }]
    }).populate('user', ['profileImage'])

    if (hasAccount)
      posts.premiumPosts = await Post.find({
        $and: [{ premium: true }, { author: author }]
      }).populate('user', ['profileImage'])

    res.json({ posts })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Something went wrong. Please try again.')
  }
})

/**
 * @route : /api/post/
 * @type : POST
 * @access : Private
 * @desc : Create a Posts with custom HTML
 */
router.post('/', [authorizePrivateRoute, validateRequest(validatePost())], async (req, res) => {
  try {
    const post = {}
    const html = {}

    const { id } = req.user
    const { title, content, css, category, premium, tags, coverImage } = req.body

    const user = await User.findById(id).select('username')

    if (!user) return res.status(404).json({ msg: "User doesn't exist" })

    html.content = sanitizeHtml(content)

    post.user = id
    post.author = user.username
    post.title = title
    post.html = html
    post.category = category
    post.coverImage = coverImage
    if (premium) post.premium = premium
    if (tags) post.tags = tags

    const savedPost = await Post.create(post)
    await savedPost.populate('user', ['profileImage']).execPopulate()

    res.json({ post: savedPost })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Something went wrong. Please try again.')
  }
})

/**
 * @route : /api/post/
 * @type : GET
 * @access : Private
 * @desc : Edit a Post
 */
router.put('/:id', [authorizePrivateRoute, validateRequest(validatePost())], async (req, res) => {
  try {
    const { id } = req.params
    const { id: userId } = req.user

    const { title, content, category, premium, tags, coverImage } = req.body

    if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid Post' })

    const post = await Post.findOne({ $and: [{ _id: id }, { user: userId }] })

    if (!post) return res.status(404).json({ msg: 'Invalid Post' })

    post.title = title
    post.category = category
    post.coverImage = coverImage
    post.html.content = content

    if (premium) post.premium = premium
    if (tags) post.tags = tags

    await post.save()
    await post.populate('user', ['profileImage']).execPopulate()

    res.json({ post: savedPost })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Something went wrong. Please try again.')
  }
})

/**
 * @route : /api/post/
 * @type : DELETE
 * @access : Private
 * @desc : Delete a post
 */
router.delete('/:id', authorizePrivateRoute, async (req, res) => {
  try {
    const { id } = req.params
    const { id: userId } = req.user

    if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid Post' })

    const post = await Post.findOne({ $and: [{ _id: id }, { user: userId }] })

    if (!post) return res.status(404).json({ msg: 'Invalid Post' })

    await post.remove()

    res.json({ msg: 'Post has been deleted' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Something went wrong. Please try again.')
  }
})

module.exports = router
