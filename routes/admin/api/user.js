const express = require('express')

const { authorizePrivateRoute } = require('../../../middleware/')
const { User } = require('../../../models/')

const router = express.Router()

/**
 * @route : admin/api/user/pending
 * @type : GET
 * @access : Private
 * @desc : Get Pending Author Requests
 */
router.get('/pending', authorizePrivateRoute, async (_req, res) => {
  try {
    const pending = await User.find({ authorRequest: true })
    res.json({ pending })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Erorr. Please Try Again.')
  }
})

/**
 * @route : admin/api/user/authors
 * @type : GET
 * @access : Private
 * @desc : Get All Registered Authors
 */
router.get('/authors', authorizePrivateRoute, async (_req, res) => {
  try {
    const authors = await User.find({ isAuthor: true })
    res.json({ authors })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Erorr. Please Try Again.')
  }
})

module.exports = router
