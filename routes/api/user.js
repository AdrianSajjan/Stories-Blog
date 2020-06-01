const express = require('express')
const bcrypt = require('bcrypt')

const { User } = require('../../models')
const { validateRequest } = require('../../middleware')
const {
  validateUserRegistration,
  generateOAuth2Tokens
} = require('../../utils')

const router = express.Router()

/**
 * @route : /api/user
 * @type : POST
 * @desc : Register an User
 */
router.post(
  '/',
  validateRequest(validateUserRegistration()),
  async (req, res) => {
    try {
      const { name, username, email, password } = req.body

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const temp = new User({
        name,
        username,
        email,
        password: hash
      })

      const user = await temp.save()

      const payload = {
        user: {
          id: user.id,
          isAuthor: user.isAuthor,
          isAdmin: user.isAdmin,
          isValidated: user.isValidated
        }
      }

      const { accessToken, refreshToken } = generateOAuth2Tokens(payload)

      res.json({ accessToken, refreshToken, user })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Something went wrong. Please Try Again.')
    }
  }
)

module.exports = router
