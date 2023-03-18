import express from "express"
import UsersController from "./UsersController.js"
import { checkUser, checkNotAdmin } from "./middleware.js"

const router = express.Router()

router.route("/")
    .get(checkUser, UsersController.apiGetUser)
    .post(UsersController.apiPostUser)
router.route("/:id")
    .delete(checkNotAdmin, UsersController.apiDeleteUser)
router.route("/login")
    .post(UsersController.apiLogin)
router.route("/logout")
    .post(checkUser, UsersController.apiLogout)

export default router