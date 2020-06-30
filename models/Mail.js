const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  subject: {
    type: String
  },
  body: {
    type: String,
    required: true
  }
})

const Mail = mongoose.model('mail', MailSchema, 'Mailbox')

module.exports = { Mail }
