const userRouter = require('./client/api/user')
const postRouter = require('./client/api/post')

const adminAuthRouter = require('./admin/api/auth')
const adminUserRouter = require('./admin/api/user')

module.exports = { userRouter, postRouter, adminAuthRouter, adminUserRouter }
