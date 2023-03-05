import app from "./server.js";
import mysql from "mysql"
import UsersDAO from "./dao/usersDAO.js"
import ReservationsDAO from "./dao/reservationsDAO.js"
import MenuDAO from "./dao/menuDAO.js"

const PORT = 8080

const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "la_nostra_casa"
})

connection.connect(err => {
    if (err) return console.error("Error connecting to database: " + err.stack)
    UsersDAO.setConnection(connection)
    ReservationsDAO.setConnection(connection)
    MenuDAO.setConnection(connection)
    app.listen(PORT, () => console.log("Server running on port " + PORT))
})

