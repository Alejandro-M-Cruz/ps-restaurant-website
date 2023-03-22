import QueryPromiseFactory from "./QueryPromiseFactory.js";

export default class ReservationsDAO {
    static connection
    static queryPromiseFactory

    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
        this.queryPromiseFactory = new QueryPromiseFactory(connection)
    }

    static addReservation = reservation =>
        this.queryPromiseFactory.create("INSERT INTO reservations SET ?", reservation)

    static deleteReservation = id =>
        this.queryPromiseFactory.create("DELETE FROM reservations WHERE id = ?", [id])

    static getAllReservations = () =>
        this.queryPromiseFactory.create("SELECT * FROM reservations ORDER BY datetime")

    static getReservationsByUserId = userId =>
        this.queryPromiseFactory.create(
            "SELECT * FROM reservations WHERE user_id = ? ORDER BY datetime",
            [userId]
        )

    static getTotalCustomersForEachDatetime = () =>
        this.queryPromiseFactory.create(
            "SELECT datetime, SUM(customers) as total_customers FROM reservations GROUP BY datetime"
        )

    static getTotalCustomersByDatetime = datetime =>
        this.queryPromiseFactory.create(
            "SELECT SUM(customers) as total_customers FROM reservations WHERE datetime = ?",
            [datetime]
        )

    static getUserIdFromReservationId = id =>
        this.queryPromiseFactory.create("SELECT user_id FROM reservations WHERE id = ?", [id])
}
