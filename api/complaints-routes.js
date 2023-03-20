import express from "express"
import ComplaintsController from "./ComplaintsController.js"
import { checkAdmin } from "./middleware.js"

const router = express.Router()

router.route("/")
    .get(checkAdmin, ComplaintsController.apiGetAllComplaints)
    .post(ComplaintsController.apiPostComplaint)

export default router