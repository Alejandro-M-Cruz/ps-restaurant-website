const db = require("./database")
const express = require("express")
const app = express()
const API = "/api/v1"
const PORT = 8080

const errorMessagesFetch = await fetch("error-mesages.json")
const errorMessages = await errorMessagesFetch.json()

let currentUser = null    // not logged in
function login(user) { currentUser = user }

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
        if (result.length === 0) return res.json({ error: "failed-login" })
        login(result[0])
        res.json({error: null})
    })
})

app.get(`${API}/user`, (req, res) => {
    if (currentUser) return res.json({ user_id: currentUser.id, admin: currentUser.admin })
    res.json(null)
})


/* ========== RESERVATIONS ========== */
app.post(`${API}/reservation`, (req, res) => {
    console.log(req.body)
    db.addReservation(req.body)
    res.json({ error: null })
})

app.all(`${API}/reservations/:user_id`, (req, res) => {
    db.getUserReservations(req.params.user_id, (err, reservations) => {
        if (err) res.json({ error: dbError })
        res.json(reservations)
    })
})

app.listen(PORT, () => {
    console.log("Server is listening on port 8080")
})
