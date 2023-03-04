export default class ReservationsDAO {
    static connection
    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
    }

    static addReservation(reservation) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO Reservations SET ?", reservation, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static deleteReservation(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM Reservations WHERE id = ?", [id], (err, result) => {
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
            this.connection.query("SELECT * FROM Reservations WHERE user_id = ?", [userId], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static getReservationDateTimes() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT date, time FROM Reservations", (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
}
