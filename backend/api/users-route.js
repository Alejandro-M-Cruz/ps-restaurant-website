import express from "express"
import UsersController from "./users-controller.js"

const router = express.Router()

router.route("/").get(UsersController.apiGetUser)
router.route("/new").post(UsersController.apiPostUser)
router.route("/:id").delete(UsersController.apiDeleteUser)
router.route("/login").post(UsersController.apiLogin)
router.route("/logout").post(UsersController.apiLogout)

export default router