import express from "express"
import MenuController from "./MenuController.js"

const router = express.Router()

router.route("/")
    .get(MenuController.apiGetMenuSections)
    .post(MenuController.apiPostMenuSection)
router.route("/:id")
    .get(MenuController.apiGetMenuItemsBySection)
    .delete(MenuController.apiDeleteMenuSection)
    .put(MenuController.apiPutMenuSection)
router.route("/items")
    .get(MenuController.apiGetMenuItems)
    .post(MenuController.apiAddMenuItem)
router.route("/items/:id")
    .delete(MenuController.apiDeleteMenuItem)
    .put(MenuController.apiPutMenuItem)

export default router