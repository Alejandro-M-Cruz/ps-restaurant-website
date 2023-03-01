import app from "./server.js";
import mysql from "mysql"
import errorMessages from "./error-messages";
import UsersDAO from "./dao/usersDAO"
import ReservationsDAO from "dao/reservationsDAO"

const PORT = 8080

const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "la_nostra_casa"
})

connection.connect(err => {
    if (err) return console.error(errorMessages["db-error"])
    UsersDAO.setConnection(connection)
    ReservationsDAO.setConnection(connection)
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`)
    })
})

