import express from "express"
import ComplaintsController from "./ComplaintsController.js"

const router = express.Router()

router.route("/")
    .get(ComplaintsController.apiGetAllComplaints)
    .post(ComplaintsController.apiPostComplaint)

export default router