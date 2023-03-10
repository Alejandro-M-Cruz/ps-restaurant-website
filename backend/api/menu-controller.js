import dao from "../dao/menuDAO.js"

export default class MenuController {
    static async apiGetMenuSections(req, res) {
        try {
            const sections = await dao.getAllMenuSections()
            res.json({ sections })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiPostMenuSection(req, res) {
        try {
            const menuSection = { name: req.body.name }
            await dao.addMenuSection(menuSection)
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiDeleteMenuSection(req ,res) {
        try {
            await dao.deleteMenuSection(req.params.id)
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiPutMenuSection(req, res) {
        try {
            const menuSection = { name: req.body.name }
            await dao.updateMenuSection(req.params.id, menuSection)
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiGetMenuItems(req, res) {
        try {
            const menuItems = await dao.getAllMenuItems()
            res.json({ menuItems })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiGetMenuItemsBySection(req, res) {
        try {
            const menuItems = await dao.getMenuItemsBySectionId(req.params.id)
            res.json({ menuItems })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiAddMenuItem(req, res) {
        try {
            const menuItem = {
                name: req.body.name,
                price: req.body.price,
                ingredients: req.body.ingredients,
                image: req.body.image,
                section_id: req.body.section_id
            }
            await dao.addMenuItem(menuItem)
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiDeleteMenuItem(req, res) {
        try {
            await dao.deleteMenuItem(req.params.id)
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }

    static async apiPutMenuItem(req, res) {
        try {
            const menuItem = {
                name: req.body.name,
                ingredients: req.body.ingredients,
                price: req.body.price,
                image: req.body.image,
                section_id: req.body.section_id
            }
            await dao.updateMenuItem(req.params.id, menuItem)
            res.json({ error: null })
        } catch(error) {
            console.error(error.message)
            res.json({ error: error.message })
        }
    }
}