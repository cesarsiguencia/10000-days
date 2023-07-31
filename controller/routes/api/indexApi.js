const router = require("express").Router()

const routesForUsers = require("./user-routes")
const routesForPosts = require("./post-routes")

router.use('/users', routesForUsers)
router.use('/posts', routesForPosts)

module.exports = router