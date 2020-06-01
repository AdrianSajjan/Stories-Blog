const cors = require('cors')
const express = require('express')

const { connectDB } = require('./config')
const { userRouter, postRouter } = require('./routes')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

connectDB()

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`)
})
