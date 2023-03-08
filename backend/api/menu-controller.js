import dao from "../dao/menuDAO.js"
import { errorMessage, noError } from "../error-messages.js";

export default class MenuController {
    static async apiGetMenu(req, res) {
        try {
            const menuItems = await dao.getAllMenuItems()
            res.json({ menuItems })
        } catch(error) {
            console.error(error.message)
            res.json(errorMessage(error.message))
        }
    }

    static async apiAddMenuItem(req, res) {
        try {
            const menuItem = {
                name: req.body.name,
                price: req.body.price,
                ingredients: req.body.ingredients,
                image: req.body.image
            }
            await dao.addMenuItem(menuItem)
            res.json(noError)
        } catch(error) {
            console.error(error.message)
            res.json(errorMessage(error.message))
        }
    }

    static async apiDeleteMenuItem(req, res) {
        try {
            await dao.deleteMenuItem(req.params.id)
            res.json(noError)
        } catch(error) {
            console.error(error.message)
            res.json(errorMessage(error.message))
        }
    }

    static async apiPutMenuItem(req, res) {
        try {
            const menuItem = {
                name: req.body.name,
                ingredients: req.body.ingredients,
                price: req.body.price,
                image: req.body.image
            }
            await dao.updateMenuItem(req.params.id, menuItem)
            res.json(noError)
        } catch(error) {
            console.error(error.message)
            res.json(errorMessage(error.message))
        }
    }
}