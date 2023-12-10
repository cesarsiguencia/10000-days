const router = require('express').Router()

const homeRoutes = require('./homepage')

const registerRoutes = require('./registration')

const dashboardRoutes = require('./dashboard')

// router.get('/', (req,res) => {
//     res.render("intro")
// })

router.use('/', homeRoutes)
router.use('/register', registerRoutes)
router.use('/dashboard', dashboardRoutes)

module.exports = router