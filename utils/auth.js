const withAuth = (rez, res, next) => {
    if (!req.sesion.logged_in) {
        res.redirect('./login')
    } else {
        next()
    }
}

module.exports = withAuth