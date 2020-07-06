const cors = require('cors')
const express = require('express')

const { connectDB } = require('./config')
const { userRouter, postRouter, adminAuthRouter, adminUserRouter } = require('./routes')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

app.use('/admin/api/auth', adminAuthRouter)
app.use('/admin/api/user', adminUserRouter)

connectDB()

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`)
})
