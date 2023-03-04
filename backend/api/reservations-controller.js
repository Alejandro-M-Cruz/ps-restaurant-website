import dao from "../dao/reservationsDAO.js"
import errorMessages from "../error-messages.js"

const MIN_DAYS_BEFORE_RESERVATION = 2
const MAX_DAYS_BEFORE_RESERVATION = 15
const MIN_TIME = 12
const MAX_TIME = 22
const MINUTES_BETWEEN_RESERVATIONS = 30
const MAX_CUSTOMERS_AT_THE_SAME_TIME = 15
const today = new Date()

export default class ReservationsController {
    static apiGetAvailableReservations(req, res) {
        dao.getReservationDateTimes()
            .then(result => {
                result.forEach(reservation => {
                    reservation.date = reservation.date.toISOString().split("T")[0]
                    reservation.time = reservation.time.substring(0, reservation.time.lastIndexOf(":"))
                })
                res.json({ times: result, error: null })
            })
            .catch(error => {
                console.error(error)
                res.status(500).json({ error: errorMessages["db-error"] })
            })
    }

    static apiGetAllReservations(req, res) {
        dao.getAllReservations()
            .then(result => res.json({ reservations: result, error: null }))
            .catch(error => res.status(500).json({ error: errorMessages["db-error"] }))
    }

    static apiGetReservationsByUserId(req, res) {
        dao.getReservationsByUserId(req.params.user_id)
            .then(result => res.json({ reservations: result, error: null }))
            .catch(error => res.status(500).json({ error: errorMessages["db-error"] }))
    }

    static apiPostReservation(req, res) {
        const newReservation = {
            user_id: req.body.user_id,
            date: req.body.date,
            time: req.body.time,
            customers: req.body.customers
        }
        dao.addReservation(req.body)
            .then(result => res.json({ error: null }))
            .catch(error => res.status(500).json({ error: errorMessages["db-error"] }))
    }

    static apiDeleteReservation(req, res) {
        dao.deleteReservation(req.params.id)
            .then(result => res.json({ error: null }))
            .catch(error => res.status(500).json({ error: errorMessages["db-error"] }))
    }
}