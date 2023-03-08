import dao from "../dao/reservationsDAO.js"
import { API } from "../server.js"
import { errorMessage, noError } from "../error-messages.js"

const MIN_DAYS_BEFORE_RESERVATION = 2
const MAX_DAYS_BEFORE_RESERVATION = 30
const MIN_TIME = 12 * 60 * 60 * 1000    // 12:00
const MAX_TIME = 22 * 60 * 60 * 1000    // 22:00
const MINUTES_BETWEEN_RESERVATIONS = 30
const MAX_CUSTOMERS_AT_THE_SAME_TIME = 30
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
    static async apiGetAvailableReservations(req, res) {
        try {
            const result = await dao.getTotalCustomersForEachDatetime()
            const available = allDateTimes()
                result.forEach(reserved => {
                    const date = formatDate(reserved.datetime)
                    const time = formatTime(reserved.datetime)
                    if (reserved.total_customers >= MAX_CUSTOMERS_AT_THE_SAME_TIME) {
                        delete available[date][time]
                        if (Object.keys(available[date]).length === 0) delete available[date]
                    } else available[date][time] -= reserved.total_customers
                })
                res.json({ available })
        } catch(error) {
            console.error(error.message)
            res.json(errorMessage(error.message))
        }
    }

    static async apiGetAllReservations(req, res) {
        try {
            const reservations = await dao.getAllReservations()
            res.json({ reservations })
        } catch(error) {
            console.error(error.message)
            res.json(errorMessage(error.message))
        }
    }

    static async apiGetReservationsByUserId(req, res) {
        try {
            const userReservations = await dao.getReservationsByUserId(req.params.id)
            res.json({ reservations: userReservations })
        } catch(error) {
            console.error(error.message)
            res.json(errorMessage(error.message))
        }
    }

    static async apiPostReservation(req, res) {
        try {
            const user = await (await fetch(`http://localhost:8080${API}/users`)).json()
            if (req.body.customers > MAX_CUSTOMERS_AT_THE_SAME_TIME)
                return res.json(errorMessage("MAX_CUSTOMERS_EXCEEDED"))
            if (user.error) return res.json({ error: user.error })
            const datetime = new Date(req.body.date + " " + req.body.time)
            const userReservations = await dao.getReservationsByUserId(user.id)
            userReservations.forEach(reservation => {
                if (reservation.datetime.toISOString() === datetime.toISOString()) 
                    throw new Error("RESERVATION_SAME_DAY")
            })
            const customers = await dao.getTotalCustomersByDatetime(datetime)
            if (customers[0].total_customers >= MAX_CUSTOMERS_AT_THE_SAME_TIME) {
                if (customers[0].total_customers + req.body.customers > MAX_CUSTOMERS_AT_THE_SAME_TIME)
                    return res.json(errorMessage("MAX_CUSTOMERS_EXCEEDED"))
                return res.json(errorMessage("RESERVATIONS_FULL"))
            }
            const newReservation = {
                user_id: user.id,
                datetime: new Date(`${req.body.date} ${req.body.time}`),
                customers: req.body.customers,
                name: req.body.name
            }
            await dao.addReservation(newReservation)
            res.json(noError)
        } catch(error) { 
            console.error(error)
            res.json(errorMessage(error.message)) 
        }
    }

    static async apiDeleteReservation(req, res) {
        try {
            await dao.deleteReservation(req.params.id)
            res.json(noError)
        } catch(error) {
            console.error(error.message)
            res.json(errorMessage(error.message))
        }
    }
}