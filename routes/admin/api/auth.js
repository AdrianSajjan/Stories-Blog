const express = require('express')
const bcrypt = require('bcrypt')

const { Admin } = require('../../../models')
const { authorizePrivateRoute, validateRequest } = require('../../../middleware')
const { validateAdminLogin, generateOAuthToken, validateAdminRegistration } = require('../../../utils')

const router = express.Router()

/**
 * @route : admin/api/auth/
 * @type : GET
 * @access : Private
 * @desc : Get Admin Details
 */
router.get('/', authorizePrivateRoute, async (req, res) => {
  try {
    const userID = req.user.id

    const admin = await Admin.findById(userID)

    if (!admin) return res.status(404).json({ msg: "Account doesn't exist" })

    return res.json({ admin })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error. Please try again!')
  }
})

/**
 * @route : admin/api/auth/
 * @type : POST
 * @access : Public
 * @desc : Login an Admin
 */
router.post('/', validateRequest(validateAdminLogin()), async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) return res.status(422).json({ msg: 'Invalid Credentials' })

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) return res.status(422).json({ msg: 'Invalid Credentials' })

    const payload = {
      user: {
        id: admin.id
      }
    }

    const accessToken = generateOAuthToken(payload)

    res.json({ accessToken })
  } catch (err) {
    console.error(error.message)
    res.status(500).send('Internal Server Error. Please try again!')
  }
})

/**
 * @route : admin/api/auth/register
 * @type : POST
 * @access : Restricted! Only available once for initial registration and then private access
 * @desc : Login an Admin
 */
router.post('/register', [authorizePrivateRoute, validateRequest(validateAdminRegistration())], async (req, res) => {
  try {
    const { name, profileImage, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const admin = new Admin({
      name,
      profileImage,
      email,
      password: hash
    })

    await admin.save()

    res.json({ msg: 'OK. Admin registered' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error. Please try again!')
  }
})

module.exports = router
