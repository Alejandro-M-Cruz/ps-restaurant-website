import express from "express"
import ReservationsController from "./ReservationsController.js"
import { checkAdmin, checkUser } from "./middleware.js"

const router = express.Router()

router.route("/")
    .get(checkAdmin, ReservationsController.apiGetReservations)
    .post(checkUser, ReservationsController.apiPostReservation)
router.route("/:id")
    .delete(checkUser, ReservationsController.apiDeleteReservation)
router.route("/available")
    .get(checkUser, ReservationsController.apiGetAvailableReservations)
router.route("/user/:id")
    .get(checkUser, ReservationsController.apiGetReservationsByUserId)

export default router