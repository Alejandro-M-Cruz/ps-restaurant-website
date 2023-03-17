export function checkAdmin(req, res, next) {
    req.session.user && req.session.user.isAdmin ? next() : res.sendStatus(403)
}

export function checkUser(req, res, next) {
    req.session.user ? next() : res.redirect("/html/login.html")
}
