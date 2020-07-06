const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, Mail } = require('../../../models')
const { validateRequest, authorizePrivateRoute } = require('../../../middleware')
const { validateUserRegistration, generateOAuth2Tokens, validateUserLogin } = require('../../../utils')

const router = express.Router()

/**
 * @route : /api/user/login
 * @type : POST
 * @access : Public
 * @desc : Register an User
 */
router.post('/login', validateRequest(validateUserLogin()), async (req, res) => {
  try {
    const { user, password } = req.body

    const userDetails = await User.findOne({
      $or: [{ email: user }, { username: user }]
    })

    if (!userDetails)
      return res.status(404).json({
        authentication: true,
        error: {
          param: 'user',
          msg: "Account doesn't exist",
          value: user
        }
      })

    const isMatch = await bcrypt.compare(password, userDetails.password)

    if (!isMatch)
      return res.status(422).json({
        authentication: true,
        error: {
          param: 'password',
          msg: "Password doesn't match",
          value: password
        }
      })

    const payload = {
      user: {
        id: userDetails.id
      }
    }

    const { accessToken, refreshToken } = generateOAuth2Tokens(payload)

    res.json({ refreshToken, accessToken })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Something went wrong. Please Try Again.')
  }
})

/**
 * @route : /api/user/register
 * @type : POST
 * @access : Public
 * @desc : Register an User
 */
router.post('/register', validateRequest(validateUserRegistration()), async (req, res) => {
  try {
    const { name, username, email, password, profileImage } = req.body

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const temp = new User({
      name,
      username,
      email,
      profileImage,
      password: hash
    })

    const user = await temp.save()

    const payload = {
      user: {
        id: user.id
      }
    }

    const { accessToken, refreshToken } = generateOAuth2Tokens(payload)

    res.json({ accessToken, refreshToken })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Something went wrong. Please Try Again.')
  }
})

/**
 * @route : /api/user/
 * @type : GET
 * @access : Private
 * @desc : Get User Details
 */
router.get('/', authorizePrivateRoute, async (req, res) => {
  try {
    const userID = req.user.id

    const user = await User.findById(userID).select('-password')

    if (!user) return res.status(404).json({ msg: "Account doesn't exist" })

    res.json({ user })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Something went wrong. Please Try Again.')
  }
})

/**
 * @route : /api/user/author-request
 * @type : POST
 * @access : Private
 * @desc : Author Approval
 */
router.post('/author-request', authorizePrivateRoute, async (req, res) => {
  const userID = req.user.id
  const hasMail = req.body.hasMail
  const mailBody = req.body.mailBody
  const mailSubject = req.body.mailSubject

  try {
    const user = await User.findById(userID)

    if (!user) return res.status(404).json({ msg: "Account doesn't exist" })

    if (user.authorRequest) return res.status(409).json({ msg: 'Your request is awaiting approval' })

    user.authorRequest = true

    if (hasMail) {
      const mail = new Mail({ user: userID, subject: mailSubject, body: mailBody })
      await mail.save()
    }

    await user.save()

    res.json({ msg: 'Request has been made. Please wait for approval' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Something went wrong. Please Try Again.')
  }
})

/**
 * @route : /api/user/oauth2
 * @type : POST
 * @access : Public
 * @desc : Get OAUTH tokens
 */
router.post('/oauth2', async (req, res) => {
  try {
    const { refreshToken: _refreshToken } = req.body

    if (!_refreshToken) {
      console.log('No Refresh Token')
      return res.status(401).json({
        authentication: true,
        msg: 'Not Authorized! Access Rejected.'
      })
    }

    const decoded = jwt.verify(_refreshToken, process.env.REFRESH_SECRET)

    const payload = {
      user: {
        id: decoded.user.id
      }
    }

    const { accessToken, refreshToken } = generateOAuth2Tokens(payload)

    res.json({ refreshToken, accessToken })
  } catch (err) {
    console.log(err.message)
    res.status(401).json({
      authentication: true,
      msg: 'Token Invalid! Access Rejected.'
    })
  }
})

module.exports = router
