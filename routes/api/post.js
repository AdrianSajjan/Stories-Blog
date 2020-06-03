const express = require('express')
const { ObjectId } = require('mongoose').Types
const { Post, User } = require('../../models')
const {
  validateGenericPost,
  validateCustomPost,
  sanitizeHtml
} = require('../../utils')
const {
  authorizeProtectedRoute,
  authorizePrivateRoute,
  validateRequest
} = require('../../middleware')

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
 * @desc : Return all Posts
 */
router.get('/:slug', authorizeProtectedRoute, async (req, res) => {
  try {
    const { slug } = req.params
    const hasAccount = req.account
    const posts = {
      freePosts: [],
      premiumPosts: []
    }

    posts.freePosts = await Post.find({
      $and: [{ premium: false }, { slug: slug }]
    })

    if (hasAccount)
      posts.premiumPosts = await Post.find({
        $and: [{ premium: true }, { slug: slug }]
      })

    res.json({ posts })
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
 * @type : GET
 * @access : Private
 * @desc : Create a Posts
 */
router.post(
  '/',
  [authorizePrivateRoute, validateRequest(validateGenericPost())],
  async (req, res) => {
    try {
      const post = {}
      const layout = {}

      const { id } = req.user
      const {
        title,
        type,
        content,
        category,
        premium,
        tags,
        coverImage,
        images
      } = req.body

      const user = await User.findById(id).select('username')

      if (!user) return res.status(404).json({ msg: "User doesn't exist" })

      layout.use = true
      layout.format = type
      layout.contents = content
      if (images) layout.images = images

      post.user = id
      post.author = user.username
      post.title = title
      post.category = category
      post.coverImage = coverImage
      post.layout = layout
      if (premium) post.premium = premium
      if (tags) post.tags = tags

      const savedPost = await Post.create(post)
      await savedPost.populate('user', ['profileImage']).execPopulate()

      res.json({ post: savedPost })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Something went wrong. Please try again.')
    }
  }
)

/**
 * @route : /api/post/custom
 * @type : POST
 * @access : Private
 * @desc : Create a Posts with custom HTML
 */
router.post(
  '/custom',
  [authorizePrivateRoute, validateRequest(validateCustomPost())],
  async (req, res) => {
    try {
      const post = {}
      const html = {}

      const { id } = req.user
      const {
        title,
        content,
        css,
        category,
        premium,
        tags,
        coverImage
      } = req.body

      const user = await User.findById(id).select('username')

      if (!user) return res.status(404).json({ msg: "User doesn't exist" })

      html.use = true
      html.content = sanitizeHtml(content)
      if (css) html.css = css

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
  }
)

/**
 * @route : /api/post/
 * @type : PUT
 * @access : Private
 * @desc : Edit a Post
 */
router.put(
  '/:id',
  [authorizePrivateRoute, validateRequest(validateGenericPost())],
  async (req, res) => {
    try {
      const { id } = req.params
      const { id: userId } = req.user

      const {
        title,
        type,
        content,
        category,
        premium,
        tags,
        coverImage,
        images
      } = req.body

      if (!ObjectId.isValid(id))
        return res.status(400).json({ msg: 'Invalid Post' })

      const post = await Post.findOne({ $and: [{ _id: id }, { user: userId }] })

      if (!post) return res.status(404).json({ msg: 'Invalid Post' })

      post.title = title
      post.category = category
      post.coverImage = coverImage

      if (premium) post.premium = premium
      if (tags) post.tags = tags

      if (post.layout && post.layout.use === true) {
        post.layout.contents = content
        post.layout.format = type
        if (images) post.layout.images = images
      }

      await post.save()
      await post.populate('user', ['profileImage']).execPopulate()

      res.json({ post })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Something went wrong. Please try again.')
    }
  }
)

/**
 * @route : /api/post/
 * @type : GET
 * @access : Private
 * @desc : Edit a Post
 */
router.put(
  '/custom/:id',
  [authorizePrivateRoute, validateRequest(validateCustomPost())],
  async (req, res) => {
    try {
      const { id } = req.params
      const { id: userId } = req.user

      const {
        title,
        content,
        css,
        category,
        premium,
        tags,
        coverImage
      } = req.body

      if (!ObjectId.isValid(id))
        return res.status(400).json({ msg: 'Invalid Post' })

      const post = await Post.findOne({ $and: [{ _id: id }, { user: userId }] })

      if (!post) return res.status(404).json({ msg: 'Invalid Post' })

      post.title = title
      post.category = category
      post.coverImage = coverImage

      if (premium) post.premium = premium
      if (tags) post.tags = tags

      if (post.html && post.html.use === true) {
        post.html.content = content
        if (css) post.html.css = css
      }

      await post.save()
      await post.populate('user', ['profileImage']).execPopulate()

      res.json({ post: savedPost })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Something went wrong. Please try again.')
    }
  }
)

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

    if (!ObjectId.isValid(id))
      return res.status(400).json({ msg: 'Invalid Post' })

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
