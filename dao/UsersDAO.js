import QueryPromiseFactory from "./QueryPromiseFactory.js";

export default class UsersDAO {
    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
        this.queryPromiseFactory = new QueryPromiseFactory(connection)
    }

    static addUser = user =>
        this.queryPromiseFactory.create(
            "INSERT INTO users (phone_number, email, password, creation_date) VALUES (?, ?, ?, CURDATE())",
            [user.phone_number, user.email, user.password]
        )

    static getUser = (phoneNumber, password) =>
        this.queryPromiseFactory.create(
            "SELECT * FROM users WHERE phone_number = ? AND password = ?",
            [phoneNumber, password]
        )

    static deleteUser = userId =>
        this.queryPromiseFactory.create(
            "DELETE FROM users WHERE id = ?",
            [userId]
        )
}
