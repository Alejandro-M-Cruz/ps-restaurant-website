export default class ReservationsDAO {
    static connection

    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
    }

    static getAllMenuItems() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM Menu", (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static addMenuItem(menuItem) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO Menu SET ?", menuItem, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static deleteMenuItem(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM Menu WHERE id = ?", [id], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static updateMenuItem(id, menuItem) {
        return new Promise((resolve, reject) => {
            this.connection.query("UPDATE Menu SET ? WHERE id = ?", [menuItem, id], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
}