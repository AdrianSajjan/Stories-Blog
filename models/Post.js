const mongoose = require('mongoose')
const slugify = require('slugify')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  author: {
    type: String,
    required: true
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
    type: String,
    required: true
  },
  layout: {
    use: Boolean,
    format: Number,
    contents: [String],
    images: [String]
  },
  html: {
    use: Boolean,
    content: String,
    css: String
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
  tags: {
    type: [String]
  }
})

PostSchema.pre('validate', function (next) {
  const slug = slugify(this.title, { strict: true, lower: true })
  this.slug = `${slug}-${new Date().toISOString().split('T', 1)[0]}`

  next()
})

const Post = mongoose.model('post', PostSchema, 'Post')

module.exports = { Post }
