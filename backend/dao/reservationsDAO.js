export default class ReservationsDAO {
    static connection
    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
    }

    static addReservation(reservation, callback) {
        this.connection.query("INSERT INTO Reservations SET ?", reservation, callback)
    }

    static deleteReservation(id, callback) {
        this.connection.query("DELETE FROM Reservations WHERE id = ?", [id], callback)
    }

    static getAllReservations(callback) {
        this.connection.query("SELECT * FROM Reservations", callback)
    }

    static getReservationsByUserId(userId, callback) {
        this.connection.query("SELECT * FROM Reservations WHERE user_id = ?", [userId], callback)
    }

    static getReservedPeople(time, callback) {
        this.connection.query("SELECT SUM(number_of_people) FROM Reservations WHERE time = ?", [time], callback)
    }
}
