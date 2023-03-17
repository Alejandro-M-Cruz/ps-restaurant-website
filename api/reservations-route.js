import express from "express"
import ReservationsController from "./ReservationsController.js"
import { checkAdmin, redirectToLogin } from "./middleware.js"

const router = express.Router()

router.route("/")
    .get(checkAdmin, ReservationsController.apiGetReservations)
    .post(redirectToLogin, ReservationsController.apiPostReservation)
router.route("/:id")
    .delete(redirectToLogin, ReservationsController.apiDeleteReservation)
router.route("/available")
    .get(redirectToLogin, ReservationsController.apiGetAvailableReservations)
router.route("/user/:id")
    .get(redirectToLogin, ReservationsController.apiGetReservationsByUserId)

export default router