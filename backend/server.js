import express from "express"
import cors from "cors"
import errorMessages from "./error-messages.js"
import users from "./api/users-route.js"
import reservations from "./api/reservations-route.js"

const app = express()
const API = "/api/v1"

app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(`${API}/users`, users)
app.use(`${API}/reservations`, reservations)    // base route
app.use("*", (req, res) => res.status(404).json({ error: errorMessages["not-found"] }))

app.get("/", (req, res) => {
    res.redirect("/html/reservations.html")
})

export default app