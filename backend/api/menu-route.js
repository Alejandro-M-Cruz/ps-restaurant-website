import express from "express"
import MenuController from "./menu-controller.js"

const router = express.Router()

router.route("/")
    .get(MenuController.apiGetMenu)
    .post(MenuController.apiAddMenuItem)
router.route("/:id")
    .delete(MenuController.apiDeleteMenuItem)
    .put(MenuController.apiUpdateMenuItem)

export default router