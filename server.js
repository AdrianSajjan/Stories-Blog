const cors = require('cors')
const express = require('express')

const { connectDB } = require('./config')
const { userRouter } = require('./routes')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)

connectDB()

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`)
})
