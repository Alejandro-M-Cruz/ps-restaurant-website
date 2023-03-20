import dotenvModule from "dotenv"
dotenvModule.config()
import mysql from "mysql"

const options = {
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "la_nostra_casa"
}

export default mysql.createConnection(options)
