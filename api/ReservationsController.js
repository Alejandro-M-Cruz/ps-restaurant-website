import dao from "../database/ReservationsDAO.js"
import { dateFormat, timeFormat } from "./date-formatting.js";

const MAX_RESERVATIONS = 5

const MIN_DAYS_BEFORE_RESERVATION = 2
const MAX_DAYS_BEFORE_RESERVATION = 30
const MIN_TIME = 12 * 60 * 60 * 1000    // 12:00
const MAX_TIME = 22 * 60 * 60 * 1000    // 22:00
const MINUTES_BETWEEN_RESERVATIONS = 30
const MAX_CUSTOMERS_AT_THE_SAME_TIME = 30
const TODAY = new Date()
const START = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())
START.setTime(START.getTime() + MIN_DAYS_BEFORE_RESERVATION * 24 * 60 * 60 * 1000 + MIN_TIME)

const validDateTimes = () => {
    const dateTimes = {}
    const current = new Date(START.getTime())
    const lastHour = new Date(START.getTime() + MAX_TIME - MIN_TIME)
    const lastDay = new Date(
        lastHour.getTime() + (MAX_DAYS_BEFORE_RESERVATION - MIN_DAYS_BEFORE_RESERVATION) * 24 * 60 * 60 * 1000
    )
    while (current.getTime() < lastDay.getTime()) {
        const date = dateFormat(current)
        dateTimes[date] = {}
        while (current.getTime() <= lastHour.getTime()) {
            dateTimes[date][timeFormat(current)] = MAX_CUSTOMERS_AT_THE_SAME_TIME
            current.setMinutes(current.getMinutes() + MINUTES_BETWEEN_RESERVATIONS)
        }
        current.setTime(current.getTime() + 24 * 60 * 60 * 1000)
        current.setHours(START.getHours(), START.getMinutes())
        lastHour.setTime(lastHour.getTime() + 24 * 60 * 60 * 1000)
    }
    return dateTimes
}

function availableDateTimes(customersByDatetime) {
    const available = validDateTimes()
    for (const reserved of customersByDatetime) {
        const date = dateFormat(reserved.datetime)
        const time = timeFormat(reserved.datetime)
        if (!available[date]) continue
        if (reserved.total_customers >= MAX_CUSTOMERS_AT_THE_SAME_TIME) {
            delete available[date][time]
            if (Object.keys(available[date]).length === 0) delete available[date]
        } else available[date][time] -= reserved.total_customers
    }
    return available
}

export default class ReservationsController {
    static async apiGetAvailableReservations(req, res) {
        try {
            res.json({ available: availableDateTimes(await dao.getTotalCustomersForEachDatetime()) })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiGetReservations(req, res) {
        try {
            const reservations = await dao.getAllReservations()
            reservations.map(reservation => {
                reservation.date = dateFormat(reservation.datetime)
                reservation.time = timeFormat(reservation.datetime)
            })
            res.json({ reservations })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiGetUserReservations(req, res) {
        try {
            const userReservations = await dao.getReservationsByUserId(req.session.user.id)
            userReservations.map(reservation => {
                reservation.date = dateFormat(reservation.datetime)
                reservation.time = timeFormat(reservation.datetime)
            })
            res.json({ reservations: userReservations })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiPostReservation(req, res) {
        try {
            const userReservations = await dao.getReservationsByUserId(req.session.user.id)
            if (userReservations.length >= MAX_RESERVATIONS) return res.json({ error: "MAX_RESERVATIONS_EXCEEDED" })
            const available = availableDateTimes(await dao.getTotalCustomersForEachDatetime())
            if (!available[req.body.date]) return res.json({ error: "INVALID_DATE" })
            if (!available[req.body.date][req.body.time]) return res.json({ error: "INVALID_TIME" })
            if (req.body.customers > MAX_CUSTOMERS_AT_THE_SAME_TIME)
                return res.json({ error: "MAX_CUSTOMERS_EXCEEDED" })
            const datetime = new Date(req.body.date + " " + req.body.time)
            for (const reservation of userReservations) {
                if (reservation.datetime.toISOString() === datetime.toISOString())
                    return res.json({ error: "RESERVATION_SAME_DAY" })
            }
            const customers = await dao.getTotalCustomersByDatetime(datetime)
            if (customers[0].total_customers >= MAX_CUSTOMERS_AT_THE_SAME_TIME) {
                if (customers[0].total_customers + req.body.customers > MAX_CUSTOMERS_AT_THE_SAME_TIME)
                    return res.json({ error: "MAX_CUSTOMERS_EXCEEDED" })
                return res.json({ error: "RESERVATIONS_FULL" })
            }
            const newReservation = {
                user_id: req.session.user.id,
                datetime: new Date(`${req.body.date} ${req.body.time}`),
                customers: req.body.customers,
                name: req.body.name
            }
            await dao.addReservation(newReservation)
            res.json({ error: null })
        } catch(error) { 
            console.error(error)
            res.json({ error: error.message }) 
        }
    }

    static async apiDeleteReservation(req, res) {
        try {
            if (!req.session.user.admin) {
                const userId = (await dao.getUserIdFromReservationId(req.params.id))[0].user_id
                if (req.session.user.id !== userId) return res.sendStatus(403)
            }
            await dao.deleteReservation(req.params.id)
            res.json({ error: null })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }
}