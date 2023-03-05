import dao from "../dao/reservationsDAO.js"
import errorMessages from "../error-messages.js"

const MIN_DAYS_BEFORE_RESERVATION = 2
const MAX_DAYS_BEFORE_RESERVATION = 15
const MIN_TIME = 12 * 60 * 60 * 1000    // 12:00
const MAX_TIME = 22 * 60 * 60 * 1000    // 22:00
const MINUTES_BETWEEN_RESERVATIONS = 30
const MAX_CUSTOMERS_AT_THE_SAME_TIME = 15
const TODAY = new Date()
const START = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())
START.setTime(START.getTime() + MIN_DAYS_BEFORE_RESERVATION * 24 * 60 * 60 * 1000 + MIN_TIME)

const  formatDate = datetime => datetime.toISOString().split("T")[0]
const formatTime = datetime => {
    const time = datetime.toISOString().split("T")[1].split(".")[0]
    return time.substring(0, time.lastIndexOf(":"))
}

const allDateTimes = () => {
    const dateTimes = {}
    const current = new Date(START.getTime())
    const lastHour = new Date(START.getTime() + MAX_TIME - MIN_TIME)
    const lastDay = new Date(
        lastHour.getTime() + (MAX_DAYS_BEFORE_RESERVATION - MIN_DAYS_BEFORE_RESERVATION) * 24 * 60 * 60 * 1000
    )
    while (current.getTime() < lastDay.getTime()) {
        const date = formatDate(current)
        dateTimes[date] = {}
        while (current.getTime() <= lastHour.getTime()) {
            dateTimes[date][formatTime(current)] = MAX_CUSTOMERS_AT_THE_SAME_TIME
            current.setMinutes(current.getMinutes() + MINUTES_BETWEEN_RESERVATIONS)
        }
        current.setTime(current.getTime() + 24 * 60 * 60 * 1000)
        current.setHours(START.getHours(), START.getMinutes())
        lastHour.setTime(lastHour.getTime() + 24 * 60 * 60 * 1000)
    }
    return dateTimes
}

export default class ReservationsController {
    static apiGetAvailableReservations(req, res) {
        dao.getTotalCustomersForEachDatetime()
            .then(result => {
                const available = allDateTimes()
                result.forEach(reserved => {
                    const date = formatDate(reserved.datetime)
                    const time = formatTime(reserved.datetime)
                    if (reserved.total_customers >= MAX_CUSTOMERS_AT_THE_SAME_TIME) {
                        delete available[date][time]
                        if (Object.keys(available[date]).length === 0) delete available[date]
                    } else available[date][time] -= reserved.total_customers
                })
                res.json({ available, error: null })
            })
            .catch(error => res.status(500).json({ error: errorMessages["db-error"] }))
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
        const datetime = new Date(req.body.date + " " + req.body.time)
        dao.getReservationsByUserId(req.body.user_id)   // Check if user has made a reservation that same day
            .then(result => {
                for (const reservation of result) {
                    if (reservation.datetime.toISOString() === datetime.toISOString())
                        return res.status(500).json({ error: errorMessages["reservation-same-day"] })
                }
                return dao.getTotalCustomersByDatetime(datetime)
            })
            .then(result => {       // Check if there are available seats for the selected datetime
                if (result.error) return
                if (result[0].total_customers >= MAX_CUSTOMERS_AT_THE_SAME_TIME)
                    return res.status(500).json({ error: errorMessages["reservation-full"] })
                const newReservation = {
                    user_id: req.body.user_id,
                    datetime: `${req.body.date} ${req.body.time}`,
                    customers: req.body.customers,
                    name: req.body.name
                }
                return dao.addReservation(newReservation)
            })
            .then(result => result.error ? null : res.json({ error: null }))
            .catch(error => res.status(500).json({ error: errorMessages["db-error"] }))
    }

    static apiDeleteReservation(req, res) {
        dao.deleteReservation(req.params.id)
            .then(result => res.json({ error: null }))
            .catch(error => res.status(500).json({ error: errorMessages["db-error"] }))
    }
}