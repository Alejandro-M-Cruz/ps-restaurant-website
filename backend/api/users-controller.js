import dao from "../dao/usersDAO.js"
import { errorMessage, noError } from "../error-messages.js"

let user
const login = loggedUser => user = loggedUser

export default class UsersController {
    static apiGetUser(req, res) {
        if (!user) return res.status(404).json(errorMessage("NOT_LOGGED_IN"))
        res.json({
            id: user.id,
            phone_number: user.phone_number,
            admin: user.admin,
            creation_date: user.creation_date
        })
    }

    static async apiPostUser(req, res) {
        const newUser = {
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password
        }
        try {
            await dao.addUser(newUser)
            res.json(noError)
        } catch(error) { 
            if (error.code === "ER_DUP_ENTRY") return res.status(404).json(errorMessage("DUPLICATE_USER"))
            res.status(500).json(errorMessage(error.message)) 
        }
    }

    static async apiDeleteUser(req, res) {
        try {
            await dao.deleteUser(req.params.id)
            res.json(noError)
        } catch(error) { res.status(500).json(errorMessage(error.message)) }
    }

    static async apiLogin(req, res) {
        try {
            const result = await dao.getUser(req.body.phone_number, req.body.password)
            if (result.length === 0) throw new Error("FAILED_LOGIN")
            login(result[0])
            res.json({ id: user.id, admin: user.admin === 1 })
        } catch(error) { res.status(404).json(errorMessage(error.message)) }
    }

    static apiLogout(req, res) {
        if (!user) return res.status(404).json(errorMessage("NOT_LOGGED_IN"))
        user = null
        res.json(noError)
    }
}