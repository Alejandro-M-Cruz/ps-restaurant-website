export function checkAdmin(req, res, next) {
    req.session.user.isAdmin ? next() : res.sendStatus(403)
}

export function redirectToLogin(req, res, next) {
    req.session.user ? next() : res.redirect("/html/login.html")
}
