import express from "express"
import session from "express-session"
import path from "path"
import users from "./api/users-route.js"
import reservations from "./api/reservations-route.js"
import menu from "./api/menu-route.js"
import complaints from "./api/complaints-route.js"
import { checkAdmin } from "./api/middleware.js"

const app = express()
const API = "/api/v1"

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7     // 1 week
    }
}))
app.use(express.static("public"))
app.use("/admin", checkAdmin)
app.use("/admin", express.static("admin"))
app.get("/", (req, res) => res.sendFile(path.resolve("public/html/index.html")))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(`${API}/users`, users)
app.use(`${API}/reservations`, reservations)
app.use(`${API}/menu`, menu)
app.use(`${API}/complaints`, complaints)

app.use("*", (req, res) => res.sendStatus(404))

export { API, app }