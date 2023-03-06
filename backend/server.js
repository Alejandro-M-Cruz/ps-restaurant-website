import express from "express"
import cors from "cors"
import { errorMessage, noError } from "./error-messages.js"
import users from "./api/users-route.js"
import reservations from "./api/reservations-route.js"
import menu from "./api/menu-route.js"

const app = express()
const API = "/api/v1"

app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(`${API}/users`, users)
app.use(`${API}/reservations`, reservations)
app.use(`${API}/menu`, menu)
app.use("*", (req, res) => res.status(404).json(errorMessage("NOT_FOUND")))

app.get("/", (req, res) => {
    res.redirect("/html/index.html")
})

export { API, app }