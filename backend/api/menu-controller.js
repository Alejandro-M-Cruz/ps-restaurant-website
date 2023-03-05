import dao from "../dao/menuDAO.js"
import errorMessages from "../error-messages.js";

export default class MenuController {
    static apiGetMenu(req, res) {
        dao.getAllMenuItems()
            .then(menuItems => res.json({ menuItems, error: null }))
            .catch(err => res.status(500).json({ error: errorMessages["db-error"] }))
    }

    static apiAddMenuItem(req, res) {
        const menuItem = {
            name: req.body.name,
            price: req.body.price,
            ingredients: req.body.ingredients,
            image: req.body.image
        }
        dao.addMenuItem(menuItem)
            .then(result => res.json({ error: null }))
            .catch(err => res.status(500).json({ error: errorMessages["db-error"] }))
    }

    static apiDeleteMenuItem(req, res) {
        dao.deleteMenuItem(req.params.id)
            .then(result => res.json({ error: null }))
            .catch(err => res.status(500).json({ error: errorMessages["db-error"] }))
    }

    static apiUpdateMenuItem(req, res) {
        const menuItem = {
            name: req.body.name,
            price: req.body.price,
            ingredients: req.body.ingredients,
            image: req.body.image
        }
        dao.updateMenuItem(req.params.id, menuItem)
            .then(result => res.json({ error: null }))
            .catch(err => res.status(500).json({ error: errorMessages["db-error"] }))
    }
}