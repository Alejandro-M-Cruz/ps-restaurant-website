import express from "express"
import ReservationsController from "./reservations-controller.js"

const router = express.Router()

router.route("/").get(ReservationsController.apiGetAllReservations)
router.route("/user/:id").get(ReservationsController.apiGetReservationsByUserId)
router.route("/new").post(ReservationsController.apiPostReservation)
router.route("/:id").delete(ReservationsController.apiDeleteReservation)
router.route("/available").get(ReservationsController.apiGetAvailableReservations)

export default router