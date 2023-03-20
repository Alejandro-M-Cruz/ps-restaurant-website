export function checkAdmin(req, res, next) {
    req.session.user && req.session.user.admin ? next() : res.sendStatus(403)
}

export function checkNotAdmin(req, res, next) {
    req.session.user && !req.session.user.admin ? next() : res.sendStatus(403)
}

export function checkLoggedIn(req, res, next) {
    req.session.user ? next() : res.json({ error: "NOT_LOGGED_IN" })
}

export function redirectToLoginIfLoggedOut(req, res, next) {
    req.session.user ? next() : res.redirect("/html/login.html")
}