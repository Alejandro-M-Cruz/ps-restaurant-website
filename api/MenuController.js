import dao from "../database/MenuDAO.js"

export default class MenuController {
    static async apiGetMenuSections(req, res) {
        try {
            const sections = await dao.getAllMenuSections()
            res.json({ sections })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiPostMenuSection(req, res) {
        try {
            const menuSection = { name: req.body.name }
            await dao.addMenuSection(menuSection)
            res.json({ error: null })
        } catch(error) {
            console.error(error)
            if (error.code === "ER_DUP_ENTRY") return res.json({ error: "DUPLICATE_MENU_SECTION" })
            res.json({ error: error.message })
        }
    }

    static async apiDeleteMenuSection(req ,res) {
        try {
            await dao.deleteMenuSection(req.params.id)
            res.json({ error: null })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiPutMenuSection(req, res) {
        try {
            const menuSection = { name: req.body.name }
            await dao.updateMenuSection(req.params.id, menuSection)
            res.json({ error: null })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiGetMenuItems(req, res) {
        try {
            const menuItems = await dao.getAllMenuItems()
            res.json({ menuItems })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiGetMenuItemsBySectionId(req, res) {
        try {
            const menuItems = await dao.getMenuItemsBySectionId(req.params.id)
            res.json({ menuItems })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiPostMenuItem(req, res) {
        try {
            const menuItem = {
                name: req.body.name,
                price: req.body.price,
                ingredients: req.body.ingredients,
                image_src: req.body.image_src,
                section_id: req.body.section_id
            }
            await dao.addMenuItem(menuItem)
            res.json({ error: null })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiDeleteMenuItem(req, res) {
        try {
            await dao.deleteMenuItem(req.params.id)
            res.json({ error: null })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }

    static async apiPutMenuItem(req, res) {
        try {
            const menuItem = {
                name: req.body.name,
                ingredients: req.body.ingredients,
                price: req.body.price,
                image_src: req.body.image_src,
                section_id: req.body.section_id
            }
            await dao.updateMenuItem(req.params.id, menuItem)
            res.json({ error: null })
        } catch(error) {
            console.error(error)
            res.json({ error: error.message })
        }
    }
}