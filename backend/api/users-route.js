import express from "express"
import UsersController from "./users-controller"

const router = express.Router()

router.route("/new").post(UsersController.apiAddUser)
router.route("/:id").delete(UsersController.apiDeleteUser)

export default router