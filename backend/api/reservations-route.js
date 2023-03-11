import express from "express"
import ReservationsController from "./ReservationsController.js"

const router = express.Router()

router.route("/")
    .get(ReservationsController.apiGetReservations)
    .post(ReservationsController.apiPostReservation)
router.route("/:id")
    .delete(ReservationsController.apiDeleteReservation)
router.route("/available")
    .get(ReservationsController.apiGetAvailableReservations)
router.route("/user/:id")
    .get(ReservationsController.apiGetReservationsByUserId)

export default router