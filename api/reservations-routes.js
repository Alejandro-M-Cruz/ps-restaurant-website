import express from "express"
import ReservationsController from "./ReservationsController.js"
import { checkLoggedIn, checkAdmin, redirectToLoginIfLoggedOut } from "./middleware.js"

const router = express.Router()

router.route("/")
    .get(checkAdmin, ReservationsController.apiGetReservations)
    .post(redirectToLoginIfLoggedOut, ReservationsController.apiPostReservation)
router.route("/:id")
    .delete(redirectToLoginIfLoggedOut, ReservationsController.apiDeleteReservation)
router.route("/available")
    .get(checkLoggedIn, ReservationsController.apiGetAvailableReservations)
router.route("/user")
    .get(checkLoggedIn, ReservationsController.apiGetUserReservations)

export default router