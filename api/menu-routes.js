import express from "express"
import MenuController from "./MenuController.js"
import { checkAdmin } from "./middleware.js"

const router = express.Router()

router.route("/")
    .get(MenuController.apiGetMenuSections)
    .post(checkAdmin, MenuController.apiPostMenuSection)
router.route("/:id")
    .get(checkAdmin, MenuController.apiGetMenuItemsBySection)
    .delete(checkAdmin, MenuController.apiDeleteMenuSection)
    .put(checkAdmin, MenuController.apiPutMenuSection)
router.route("/items")
    .get(MenuController.apiGetMenuItems)
    .post(checkAdmin, MenuController.apiAddMenuItem)
router.route("/items/:id")
    .delete(checkAdmin, MenuController.apiDeleteMenuItem)
    .put(checkAdmin, MenuController.apiPutMenuItem)

export default router