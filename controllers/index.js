const router = require('express').Router()

const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')

router.get('/', async(req, res) => {
    res.render('homepage')
})

router.use('/api', apiRoutes)

module.exports = router