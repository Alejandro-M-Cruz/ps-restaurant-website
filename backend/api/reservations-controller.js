import dao from "../dao/reservationsDAO"
import errorMessages from "../error-messages.js"

const dbError = { error: errorMessages["db-error"] }
const noError = { error: null }

export default class ReservationsController {
    static apiAllReservations(req, res) {
        dao.getAllReservations((err, reservations) => {
            if (err) return res.status(500).json(dbError)
            res.json({ reservations, error: null })
        })
    }

    static apiGetReservationsByUserId(req, res) {
        dao.getReservationsByUserId(req.params.user_id, (err, reservations) => {
            if (err) return res.status(500).json(dbError)
            res.json({ reservations, ...noError })
        })
    }

    static apiPostReservation(req, res) {
        dao.addReservation(req.body, (err) => {
            if (err) return res.status(500).json(dbError)
            res.json(noError)
        })
    }

    static apiDeleteReservation(req, res) {
        dao.deleteReservation(req.params.id, (err) => {
            if (err) return res.status(500).json(dbError)
            res.json(noError)
        })
    }

}