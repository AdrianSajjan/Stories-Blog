const jwt = require('jsonwebtoken')

const authorizePrivateRoute = async (req, res, next) => {
  try {
    const accessToken = req.header('accessToken')

    if (!accessToken)
      return res.status(401).json({
        forbidden: true,
        msg: 'Request Forbidden. No Access Token found.'
      })

    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({
      forbidden: true,
      msg: 'Request Forbidden. Access Token is invalid.'
    })
  }
}

module.exports = { authorizePrivateRoute }
