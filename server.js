import dbConnection from "./database/connection.js"
import express from "express"
import session from "express-session"
import mysqlStoreModule from "express-mysql-session"
import path from "path"
import users from "./api/users-routes.js"
import reservations from "./api/reservations-routes.js"
import menu from "./api/menu-routes.js"
import complaints from "./api/complaints-routes.js"
import { checkUser, checkAdmin } from "./api/middleware.js"

const app = express()
const API = "/api/v1"
const MySQLStore = mysqlStoreModule(session)

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, dbConnection),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7     // 1 week
    }
}))

app.use(express.static("static/public"))
app.use("/logged", checkUser)
app.use("/logged", express.static("static/logged"))
app.use("/admin", checkAdmin)
app.use("/admin", express.static("static/admin"))
app.get("/", (req, res) => {
    res.sendFile(path.resolve("static/public/html/index.html"))
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(`${API}/users`, users)
app.use(`${API}/reservations`, reservations)
app.use(`${API}/menu`, checkAdmin)      // Menu edition only for admin
app.use(`${API}/menu`, menu)
app.use(`${API}/complaints`, complaints)

app.use("*", (req, res) => res.sendStatus(404))

export default app
