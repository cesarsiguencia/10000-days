const router = require("express").Router()

const routesForUsers = require("./user-routes")
const routesForPosts = require("./post-routes")
const routesForComments = require("./comment-routes")

router.use('/users', routesForUsers)
router.use('/posts', routesForPosts)
router.use('/comments', routesForComments)

module.exports = router