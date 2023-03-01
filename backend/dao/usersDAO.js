let users

export default class UsersDAO {
    static connection
    static setConnection(connection) {
        if (users) return
        this.connection = connection
        connection.query("SELECT * FROM Users", (err, result) => {
            if (err) return console.error("Unable to initialize ReservationsDAO...")
            users = result
        })
    }

    static async addUser(user, callback) {
        this.connection.query(
            "INSERT INTO Users (phone_number, email, password, creation_date) VALUES (?, ?, ?, CURDATE())",
            [user.phone_number, user.email, user.password],
            callback
        )
    }

    static async getUser(phoneNumber, password, callback) {
        this.connection.query(
            "SELECT * FROM Users WHERE phone_number = ? AND password = ?",
            [phoneNumber, password],
            callback
        )
    }

    static async checkPhoneNumber(phoneNumber, callback) {
        this.connection.query("SELECT COUNT(*) FROM Users WHERE phone_number = ?", [phoneNumber], (err, result) => {
            callback(err, result > 0)
        })
    }

    static async deleteUser(userId, callback) {
        this.connection.query("DELETE FROM Users WHERE id = ?", [userId], callback)
    }
}
