import express from "express"
import UsersController from "./UsersController.js"
import { redirectToLogin } from "./middleware.js"

const router = express.Router()

router.route("/")
    .get(redirectToLogin, UsersController.apiGetUser)
    .post(UsersController.apiPostUser)
router.route("/:id")
    .delete(redirectToLogin, UsersController.apiDeleteUser)
router.route("/login")
    .post(UsersController.apiLogin)
router.route("/logout")
    .post(redirectToLogin, UsersController.apiLogout)

export default router