import dbConnection from "../database/connection.js"
import express from "express"
import session from "express-session"
import mysqlStoreModule from "express-mysql-session"
import path from "path"
import users from "./users-routes.js"
import reservations from "./reservations-routes.js"
import menu from "./menu-routes.js"
import complaints from "./complaints-routes.js"
import { redirectToLoginIfLoggedOut, checkAdmin } from "./middleware.js"

const app = express()
const API = "/api/v1"
const MySQLStore = mysqlStoreModule(session)

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, dbConnection),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24     // 24 hours
    }
}))

app.use(express.static("static/public"))
app.use("/logged-in", redirectToLoginIfLoggedOut)
app.use("/logged-in", express.static("static/logged-in"))
app.use("/admin", checkAdmin)
app.use("/admin", express.static("static/admin"))

app.get("/", (req, res) => {
    if (!req.session.user) return res.redirect("/html/index.html")
    if (req.session.user.admin) return res.redirect("/admin/html/index-admin.html")
    res.redirect("/html/index.html")
})

app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(process.cwd(), "favicon.ico"))
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(`${API}/users`, users)
app.use(`${API}/reservations`, reservations)
app.use(`${API}/menu`, menu)
app.use(`${API}/complaints`, complaints)

app.use("*", (req, res) => res.sendStatus(404))

export default app
