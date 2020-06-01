const mongoose = require('mongoose')
const slugify = require('slugify')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  coverImage: {
    url: String,
    publicID: String
  },
  layout: {
    type: Number,
    content: [String],
    image: [{ url: String, publicID: String }]
  },
  customLayout: {
    type: Boolean,
    default: false
  },
  html: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  premium: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  tags: [String]
})

PostSchema.pre('validate', (next) => {
  this.slug = slugify(this.title, { strict: true, lower: true })
  next()
})

const Post = mongoose.model('post', PostSchema, 'Post')

module.exports = { Post }
