const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  profileImage: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isValidated: {
    type: Boolean,
    default: true
  },
  isAuthor: {
    type: Boolean,
    default: false
  },
  authorRequest: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('user', UserSchema, 'User')

module.exports = { User }
