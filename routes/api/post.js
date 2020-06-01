const express = require('express')
const { Post } = require('../../models')
const { validateGenericPost } = require('../../utils')
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
 * @route : /api/post/generic
 * @type : GET
 * @access : Private
 * @desc : Return all Posts
 */
router.post(
  '/generic',
  [authorizePrivateRoute, validateRequest(validateGenericPost())],
  async (req, res) => {
    try {
      const id = req.user.id
      const { title, layout, content, category, premium, tags } = req.body

      const formattedContent = content.split('breakclause;')
      res.json({ content: formattedContent })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Something went wrong. Please try again.')
    }
  }
)

module.exports = router
