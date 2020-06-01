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
    .matches(/[a-zA-Z ]/)
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
    .matches(/[a-z0-9_]/)
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
    if (req.body.password !== value) throw new Error("Passwords don't match")
    else return true
  })
]

module.exports = { validateUserRegistration }
