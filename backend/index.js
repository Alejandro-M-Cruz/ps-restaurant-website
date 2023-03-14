import { app } from "./server.js";
import mysql from "mysql"
import promptModule from "prompt-sync"
const prompt = promptModule()
import UsersDAO from "./dao/UsersDAO.js"
import ReservationsDAO from "./dao/ReservationsDAO.js"
import MenuDAO from "./dao/MenuDAO.js"
import ComplaintsDAO from "./dao/ComplaintsDAO.js"

const PORT = 8080
const MYSQL_USER = prompt("MySQL user: ")
const MYSQL_PASSWORD = prompt("MySQL password: ")

const connection = mysql.createConnection({
    host: "localhost",
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: "la_nostra_casa"
})

connection.connect(err => {
    if (err) return console.error("Error connecting to database: " + err.stack)
    UsersDAO.setConnection(connection)
    ReservationsDAO.setConnection(connection)
    MenuDAO.setConnection(connection)
    ComplaintsDAO.setConnection(connection)
    app.listen(PORT, () => console.log("Server running on port " + PORT))
})

