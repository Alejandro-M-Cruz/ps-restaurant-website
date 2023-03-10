export default class ReservationsDAO {
    static connection

    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
    }

    static addReservation(reservation) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO reservations SET ?", reservation, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static deleteReservation(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM reservations WHERE id = ?", [id], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static getAllReservations() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM Reservations", (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static getReservationsByUserId(userId) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM reservations WHERE user_id = ?", [userId], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static getTotalCustomersForEachDatetime() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT datetime, SUM(customers) as total_customers FROM reservations GROUP BY datetime",
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                }
            )
        })
    }

    static getTotalCustomersByDatetime(datetime) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT SUM(customers) as total_customers FROM reservations WHERE datetime = ?",
                [datetime],
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                }
            )
        })
    }
}
