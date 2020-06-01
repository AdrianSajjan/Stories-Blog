const jwt = require('jsonwebtoken')

const authorizeProtectedRoute = async (req, res, next) => {
  try {
    const { accessToken } = req.header

    if (!accessToken) {
      req.account = false
      return next()
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET)
    decoded ? (req.account = true) : (req.account = false)
    next()
  } catch (error) {
    res.status(401).json({
      forbidden: true,
      msg: 'Request Forbidden. Access Token is invalid.'
    })
  }
}

module.exports = { authorizeProtectedRoute }
