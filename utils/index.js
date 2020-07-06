const { generateOAuth2Tokens, generateOAuthToken } = require('./tokens')
const { sanitizeHtml } = require('./sanitization')
const {
  validateUserRegistration,
  validateUserLogin,
  validatePost,
  validateAdminLogin,
  validateAdminRegistration
} = require('./validations')

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validatePost,
  validateAdminLogin,
  validateAdminRegistration,
  generateOAuth2Tokens,
  generateOAuthToken,
  sanitizeHtml
}
