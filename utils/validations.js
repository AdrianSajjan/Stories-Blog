const { User } = require('../models')
const { body } = require('express-validator')

const validateUserRegistration = () => [
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 4 })
    .withMessage('Please enter your full name')
    .matches(/[a-zA-Z ]$/)
    .withMessage('Name has invalid characters'),

  body('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username cannot be empty')
    .isLength({ min: 4 })
    .withMessage('Username cannot be less than 4 letters')
    .isLength({ max: 16 })
    .withMessage('Username cannot be more than 16 letters')
    .matches(/[a-z0-9_.]$/)
    .withMessage('Username has invalid characters')
    .custom(async (value) => {
      const user = await User.findOne({ username: value })
      if (user) throw new Error('Username is not available')
      else return true
    }),

  body('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (value) => {
      const user = await User.findOne({ email: value })
      if (user) throw new Error('Email already in use')
      else return true
    }),

  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password cannot be less than 6 characters'),

  body('confirmPassword').custom((value, { req }) => {
    const { password } = req.body
    if (password && password !== value) throw new Error("Passwords don't match")
    else return true
  })
]

const validateUserLogin = () => [
  body('user')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your username or email'),

  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty')
]

const validateGenericPost = () => [
  body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 10 })
    .withMessage('Title must contain atleast 10 letters')
    .matches(/[a-zA-Z0-9!_-]$/)
    .withMessage('Title has invalid characters')
    .matches(/[a-zA-Z]$/)
    .withMessage('Title must contain letters')
    .custom((value) => {
      const wordLength = value.split(' ').length
      if (wordLength < 3)
        throw new Error('Title must contain atleast three words')
      else return true
    }),

  body('coverImage')
    .not()
    .isEmpty()
    .withMessage('Please provide URL to Cover Image')
    .isURL()
    .withMessage('Please provide a valid URL'),

  body('type')
    .not()
    .isEmpty()
    .withMessage('Please provide a layout')
    .isNumeric()
    .withMessage('Please provide a valid layout'),

  body('content').isArray({ min: 1 }).withMessage('Content cannot be empty'),

  body('content.*').not().isEmpty().withMessage('Content cannot be empty'),

  body('images')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Images cannot be empty'),

  body('images.*').optional().isURL().withMessage('Please provide a valid URL'),

  body('category').not().isEmpty().withMessage('Please provide the category')
]

const validateCustomPost = () => [
  body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 10 })
    .withMessage('Title must contain atleast 10 letters')
    .matches(/[a-zA-Z0-9!_-]$/)
    .withMessage('Title has invalid characters')
    .matches(/[a-zA-Z]$/)
    .withMessage('Title must contain letters'),

  body('coverImage')
    .not()
    .isEmpty()
    .withMessage('Please provide URL to Cover Image')
    .isURL()
    .withMessage('Please provide a valid URL'),

  body('content')
    .not()
    .isEmpty()
    .withMessage('Content cannot be empty')
    .isLength({ min: 100 })
    .withMessage('Content cannot be less than 100 letters'),

  body('category').not().isEmpty().withMessage('Please provide the category')
]

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateGenericPost,
  validateCustomPost
}
