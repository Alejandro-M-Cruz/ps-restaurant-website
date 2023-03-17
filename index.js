import dbConnection from "./database/connection.js"
import app from "./server.js"
import UsersDAO from "./database/UsersDAO.js"
import ReservationsDAO from "./database/ReservationsDAO.js"
import MenuDAO from "./database/MenuDAO.js"
import ComplaintsDAO from "./database/ComplaintsDAO.js"

const PORT = 8080

dbConnection.connect(err => {
    if (err) return console.error("Error connecting to database: " + err.stack)
    UsersDAO.setConnection(dbConnection)
    ReservationsDAO.setConnection(dbConnection)
    MenuDAO.setConnection(dbConnection)
    ComplaintsDAO.setConnection(dbConnection)
    app.listen(PORT, () => console.log("Server running on port " + PORT))
})
