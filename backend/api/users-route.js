import express from "express"
import UsersController from "./UsersController.js"

const router = express.Router()

router.route("/")
    .get(UsersController.apiGetUser)
    .post(UsersController.apiPostUser)
router.route("/:id")
    .delete(UsersController.apiDeleteUser)
router.route("/login")
    .post(UsersController.apiLogin)
router.route("/logout")
    .post(UsersController.apiLogout)

export default router