const { validateRequest } = require('./validator')
const { authorizePrivateRoute } = require('./private')
const { authorizeProtectedRoute } = require('./protected')

module.exports = {
  validateRequest,
  authorizeProtectedRoute,
  authorizePrivateRoute
}
