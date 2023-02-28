const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "la_nostra_casa"
})

function addUser(user, callback) {
    con.query(
        "INSERT INTO Users (phone_number, email, password, creation_date) VALUES (?, ?, ?, curdate())",
        [user.phone_number, user.email, user.password],
        callback
    )
}

function getUser(phoneNumber, password, callback) {
    con.query(
        "SELECT * FROM Users WHERE phone_number = ? AND password = ?",
        [phoneNumber, password],
        callback
    )
}

function checkPhoneNumber(phoneNumber, callback) {
    con.query("SELECT COUNT(*) FROM Users WHERE phone_number = ?", [phoneNumber], (err, result) => {
        callback(err, result > 0)
    })
}

function deleteUser(userId, callback) {
    con.query("DELETE FROM Users WHERE id = ?", [userId], callback)
}

function addReservation(reservation, callback) {
    con.query("INSERT INTO Reservations SET ?", reservation, callback)
}

function deleteReservation(reservation, callback) {
    con.query("DELETE FROM Reservations WHERE id = ?", [reservation.id], callback)
}

function getAllReservations(callback) {
    con.query("SELECT * FROM Reservations", callback)
}

function getUserReservations(userId, callback) {
    con.query("SELECT * FROM Reservations WHERE user_id = ?", [userId], callback)
}

function getReservedPeople(time, callback) {
    con.query("SELECT SUM(number_of_people) FROM Reservations WHERE time = ?", [time], callback)
}

module.exports = { 
    addUser, getUser, checkPhoneNumber, deleteUser, 
    addReservation, deleteReservation, getAllReservations, getUserReservations, getReservedPeople
}