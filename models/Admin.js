const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
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
  }
})

const Admin = mongoose.model('admin', AdminSchema, 'Admin')

module.exports = { Admin }
