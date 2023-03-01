import express from "express"
import cors from "cors"
import errorMessages from "./error-messages.js"
import users from "./api/users-route"
import reservations from "./api/reservations-route"

const app = express()
const API = "/api/v1"
const PORT = 8080

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


/* ========== USERS ========== */
app.get(`${API}/check-phone-number/:phone_number`, (req, res) => {
    db.checkPhoneNumber(req.params.phone_number, (err, exists) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        if (exists) return res.json({ 
            phone_number_exists: true, 
            message: errorMessages["phone-number-exists"], 
            error: null 
        })
        res.json({ phone_number_exists: false, error: null })
    })
})

app.post(`${API}/user-signup`, (req, res) => {
    db.addUser(req.body, (err) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        login(newUser)
    })
})

app.post(`${API}/user-login`, (req, res) => {
    db.getUser(req.body.phone_number, req.body.password, (err, result) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        if (result.length === 0) return res.json({ error: errorMessages["failed-login"] })
        login(result[0])
        res.json({ error: null })
    })
})

app.get(`${API}/user`, (req, res) => {
    if (currentUser) return res.json({ 
        user_id: currentUser.id, 
        admin: currentUser.admin, 
        error: null 
    })
    res.json({ error: errorMessages["not-logged-in"] })
})

app.delete(`${API}/user`, (req, res) => {
    db.deleteUser(currentUser.id, (err) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        logout()
        res.json({ error: null })
    })
})


/* ========== RESERVATIONS ========== */
app.post(`${API}/reservation`, (req, res) => {
    db.getUserReservations(req.params.user_id, (err, reservations) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        for (const reservation of reservations) {
            if (new Date(reservation.date) === new Date(req.body.date)) {
                return res.json({ error: errorMessages["reservation-same-day"] })
            }
        }
        db.addReservation(req.body, (err) => {
            if (err) return res.json({ error: errorMessages["db-error"] })
            res.json({ error: null })
        })
    })
})

app.all(`${API}/reservations`, (req, res) => {
    db.getAllReservations((err, reservations) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        res.json({ error: null })
    })
})

app.all(`${API}/reservations/:user_id`, (req, res) => {
    db.getUserReservations(req.params.user_id, (err, reservations) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        res.json({ reservations, error: null })
    })
})

const now = new Date(Date.now())
const MINUTES_BETWEEN_RESERVATIONS = 30
const MIN_DAYS_IN_ADVANCE = 2
const MAX_DAYS_IN_ADVANCE = 15
const MAX_NUMBER_OF_PEOPLE = 15
const CLOSED_DAYS = [0]     // closed on Mondays
const MIN_DATE = new Date(Date.now() + MIN_DAYS_IN_ADVANCE * 24 * 60 * 60 * 1000)
const MAX_DATE = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const current = MIN_DATE
app.all(`${API}/available-reservations`, (req, res) => {
    db.getAllReservations((err, reservations) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        res.json({ dates, times, error: null })
    })
})

app.all(`${API}/reserved-people/:time`, (req, res) => {
    db.getReservedPeople(req.params.time, (err, reserved) => {
        if (err) return res.json({ error: errorMessages["db-error"] })
        res.json({ reserver_people: reserved, error: null })
    })
})

app.listen(PORT, () => {
    console.log("Server is listening on port 8080")
})

export default app