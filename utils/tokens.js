const jwt = require('jsonwebtoken')

require('dotenv').config()

const generateOAuth2Tokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: '1h'
  })

  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: '2d'
  })

  return { accessToken, refreshToken }
}

const generateOAuthToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: '1d'
  })

  return accessToken
}

module.exports = { generateOAuth2Tokens, generateOAuthToken }
