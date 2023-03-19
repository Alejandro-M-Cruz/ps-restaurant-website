import express from "express"
import UsersController from "./UsersController.js"
import { checkLoggedIn, redirectToLoginIfLoggedOut, checkNotAdmin } from "./middleware.js"

const router = express.Router()

router.route("/")
    .get(checkLoggedIn, UsersController.apiGetUser)
    .post(UsersController.apiPostUser)
    .delete(checkNotAdmin, UsersController.apiDeleteUser)
router.route("/login")
    .post(UsersController.apiLogin)
router.route("/logout")
    .post(redirectToLoginIfLoggedOut, UsersController.apiLogout)

export default router