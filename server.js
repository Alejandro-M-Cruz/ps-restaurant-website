import express from "express"
import cors from "cors"
import path from "path"
import { alertMessage } from "./public/javascript/alert-messages.js"
import users from "./api/users-route.js"
import reservations from "./api/reservations-route.js"
import menu from "./api/menu-route.js"
import complaints from "./api/complaints-route.js"

const app = express()
const API = "/api/v1"
async function getLoggedUser() {
    const response = await fetch(`http://localhost:8080${API}/users/`)
    return response.json()
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(`${API}/users`, users)
app.use(`${API}/reservations`, reservations)
app.use(`${API}/menu`, menu)
app.use(`${API}/complaints`, complaints)

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/html/index.html"))
})

app.use("*", (req, res) => res.status(404).json(alertMessage("NOT_FOUND")))

export { API, app }