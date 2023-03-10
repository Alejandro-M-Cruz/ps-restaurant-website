export default class UsersDAO {
    static connection

    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
    }

    static addUser(user) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "INSERT INTO users (phone_number, email, password, creation_date) VALUES (?, ?, ?, CURDATE())",
                [user.phone_number, user.email, user.password],
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                }
            )
        })
    }

    static getUser(phoneNumber, password) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT * FROM users WHERE phone_number = ? AND password = ?",
                [phoneNumber, password],
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                }
            )
        })
    }

    static deleteUser(userId) {
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
}
