const mongoose = require('mongoose')

require('dotenv').config()

const DATABASE_URI = process.env.DATABASE_URI

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB.')
  } catch (err) {
    console.log("Coudn't connect to MongoDB.")
    console.log(err.message)
  }
}

module.exports = { connectDB }
