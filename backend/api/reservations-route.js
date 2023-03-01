import express from "express"
import ReservationsController from "./reservations-controller"

const router = express.Router()

router.route("/").all(ReservationsController.apiAllReservations)
router.route("/user/:id").get(ReservationsController.apiGetReservationsByUserId)
router.route("/new").post(ReservationsController.apiPostReservation)
router.route("/:id").delete(ReservationsController.apiDeleteReservation)

export default router