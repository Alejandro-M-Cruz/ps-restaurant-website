export default class MenuDAO {
    static connection

    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
    }

    static getAllMenuSections() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM menu_sections", (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static updateMenuSection(id, menuSection) {
        return new Promise((resolve, reject) => {
            this.connection.query("UPDATE menu_sections SET ? WHERE id = ?", [menuSection, id], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static addMenuSection(menuSection) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO menu_sections SET ?", menuSection, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static deleteMenuSection(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM menu_sections WHERE id = ?", [id], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static getAllMenuItems() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM menu_items ORDER BY section_id", (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static getMenuItemsBySectionId(sectionId) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM menu_items WHERE section_id = ?", [sectionId], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static addMenuItem(menuItem) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO menu_items SET ?", menuItem, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static deleteMenuItem(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM menu_items WHERE id = ?", [id], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static updateMenuItem(id, menuItem) {
        return new Promise((resolve, reject) => {
            this.connection.query("UPDATE menu_items SET ? WHERE id = ?", [menuItem, id], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
}